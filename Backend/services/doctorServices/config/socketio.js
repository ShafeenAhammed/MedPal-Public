const socketIo = require('socket.io');
const cors = require('cors');
const appoinmentCollection = require('../model/appoinmentSchema');

function configureSocket(server) {
    const io = socketIo(server, {
        cors: {
            path: '/socket.io/',
            origin: 'http://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        },
    });
    // let users = [];
    // //add user
    // const addUser = (userId, socketId) => {
    //   !users.some((user) => user.userId === userId) &&
    //     users.push({ userId, socketId });
    // };
    // //remove user
    // const removeUser = (socketId) => {
    //   users = users.filter((user) => user.socketId !== socketId);
    // };
    // //get user
    // const getUser = (userId) => {
    //   return users.find((user) => user.userId === userId);
    // };

     let rooms = {};
    let room;

    const roleToSocketMapping = new Map();
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on("join room", (data) => {
          room = data.room;

          if (!rooms[room]) {
              rooms[room] = [];
          }

          console.log(`${socket.id}- ${data.role} joined ${room}`);
          rooms[room].push({ userId: socket.id, role: data.role });
          roleToSocketMapping.set(data.role, socket.id)
          socket.join(room);
          socket.broadcast.to(room).emit("user joined", {role:data.role,id:socket.id})
          // io.to(room).emit('user joined', socket.id);
          
          // io.to(room).emit("room:join", data);
        });

        socket.on('offer', (data) => {
          console.log("offer socketid",socket.id); 
          // io.to(room).emit('participants', rooms[room]);
          console.log("inisde offer", room,"sending offer to ", data.id);
          io.to(data.id).emit('offer', {id:socket.id,offer:data.offer});
        });
        
        socket.on('answer', (data) => {
          console.log("ans socketid",socket.id);
          // io.to(room).emit('participants', rooms[room]);
          console.log("inside ",room ," answer to", data.id);
          socket.to(data.id).emit('answer', data.answer);
        });

        socket.on('peer-nego-needed',(data)=>{
          console.log("peer nego needed");
          io.to(data.id).emit('peer-nego-needed', {id:socket.id,offer:data.offer});
        })
        
        socket.on('peer-nego-done',(data)=>{
          console.log("peer-nego-done");
          io.to(data.id).emit('peer-nego-final', {id:socket.id,answer: data.answer})
        })

          // socket.on('ice-candidate', (data) => {
          //   io.to(data.target).emit('ice-candidate', data.candidate);
          // });
        
          socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            if (rooms[room]) {
              rooms[room] = rooms[room].filter((user) => user.userId !== socket.id);
          }
          });
        });
}

console.log("Video socket config");
module.exports = configureSocket;
