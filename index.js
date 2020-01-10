const express = require('express');
const helmet = require('helmet');

const carRouter = require('./car/car-router')

const server = express()
const port = process.env.PORT || 4001

server.use(helmet());
server.use(express.json());

server.get('/', (req, res, next) => res.send('Hello World'))
server.use('/api/cars', carRouter);

server.listen(port, () => console.log(`Server is listeing on Port ${port}!`))