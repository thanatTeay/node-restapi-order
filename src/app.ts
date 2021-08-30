import express from 'express';
import config from "./config/default"
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session';
import beverageRoutes from './routes/beverage.routes'
import optionRoutes from './routes/option.routes'
import orderRoutes from './routes/order.routes'
import cookieParser from 'cookie-parser';
import passport from 'passport';


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

app.use(express.json());
app.use(cors())
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())






app.use('/api/beverages', beverageRoutes)
app.use('/api/options', optionRoutes)
app.use('/api/orders', orderRoutes)


app.listen(config.server.port || 8080, () =>{
    console.log(`Server listen at port http://${config.server.hostname}:${config.server.port}`);
})