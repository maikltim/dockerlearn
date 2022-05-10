const express = require("express"); 
const mongoose = require("mongoose");
const session = require("express-session")
const redis = require("redis");
const cors = require("cors")
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    redis: REDIS_PORT
})

const {MOGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSSION_SECRET, REDIS_PORT} = require("./config/config");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRouter");


const app = express(); 

const mongoURL = `mongoose://${MOGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => console.log("successfully connected to DB"))
.catch((e) => console.log("e"))

connectWithRetry();
app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h1>Hello world!!!!</h2>");
})

app.enable("trust proxy");
app.use(corse({}))
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.use("api/v1/post", postRouter)
app.use("api/v1/user", userRouter)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listen port ${port}`)); 