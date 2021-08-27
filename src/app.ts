import express from 'express';
import config from "./config/default"
import mongoose from 'mongoose'
import http from 'http'
import bodyParser from 'body-parser';
import beverageRoutes from './routes/beverage.routes'

const NAMESPACE = 'app'

const app = express();

mongoose.connect(config.mongo.url, config.mongo.options).then( result => {
    console.log(NAMESPACE, "Connected to mongoDB")
}).catch(error => {
    console.log(NAMESPACE, error.message,error)
})

app.use((req,res,next) =>{
    console.log(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket}]`)

    next()
})



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/beverages', beverageRoutes)


app.listen(config.server.port || 8080, () =>{
    console.log(`Server listen at port http://${config.server.hostname}:${config.server.port}`);
})