const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/api/user-service', proxy('http://localhost:3001'));

app.use('/api/medicalstore-service', proxy('http://localhost:3002'));

app.use('/api/doctor-service', proxy('http://localhost:3003'));

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
