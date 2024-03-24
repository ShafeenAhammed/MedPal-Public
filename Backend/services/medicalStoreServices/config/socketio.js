// const {socketIo, Server} = require('socket.io');
const socketIo = require('socket.io');

const cors = require('cors');
const orderCollection = require('../model/orderSchema');
const medicalStoreCollection = require('../model/medicalStoreSchema');



async function getDeliveryExecLocation (medId) {
    try{
        location = await medicalStoreCollection.findOne({medId:medId},{deliveryExecLocation:1,_id:0});
        return location;
    }
    catch(err){
        console.log("error in fetching del exec loc",err);
    }
}

function configureSocket(server) {

  const io = socketIo(server, {
      cors: {
          path: '/socket.io/',
          origin: 'http://localhost:4200',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
  });
  
  io.on('connection', (socket) => {
    console.log('Client connected');
    let medId;
    socket.on('medId', (data) => {
        console.log('Received data from client:', data.medId);
        medId = data.medId;
    });

    let prevLoc;
    let location;
    const intervalId = setInterval(async () => {
      // const location = {
      //   lat: Math.random() * 10 + 30,
      //   lng: Math.random() * 10 + 60,
      // };
      const op = await getDeliveryExecLocation(medId);
      if(op){
        location = op.deliveryExecLocation
      }
      console.log("Exec", location);
      console.log("prev", prevLoc);

      // if(!prevLoc || prevLoc.latitude !== location.latitude || prevLoc.longitude !== location.longitude ){
      //   socket.emit('locationUpdate', location);
      //   prevLoc = location;
      //   console.log("prev changed",prevLoc);
      // }
      
      socket.emit('locationUpdate', location);
    }, 5000);


    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(intervalId);
      // io.close();
    });
  });

  return io;
}
console.log('configureSocket is being called.');
module.exports = configureSocket;
