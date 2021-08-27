import dotenv from 'dotenv'

dotenv.config()

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'Thanat2208'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'thegame901'
const MONGO_HOST = process.env.MONGO_URL || 'crud.qooys.mongodb.net/beverage?retryWrites=true&w=majority'

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVERPORT || 8080

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}



export default config