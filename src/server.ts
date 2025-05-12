import express from 'express';
import 'colors';
import cors from 'cors';
import morgan from 'morgan';
import {PORT} from "./config/config";
import {connectDB} from "./config/db";
import testRoutes from './routes/TestRoutes';
import authRoutes from "./routes/AuthRoutes";

// rest object
const app = express();

// db connection
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to Kono Banking Server</h1>');
});

const port = PORT || 4000;

app.listen(port, () => {
    console.log(`Server Running on ${port}`.bgMagenta.white.italic);
});
