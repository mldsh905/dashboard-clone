import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from "body-parser";
import mongoose, {ConnectOptions} from "mongoose";
import dotenv from 'dotenv';
import morgan from 'morgan';
import clientRoutes from './routes/client';
import generalRoutes from './routes/general';

//data imports
import User from './models/User';
import Product from "./models/Product";
import ProductStat from "./models/ProductStat";
import OverallStat from "./models/OverallStat";
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat} from "./data";
import Transaction from "./models/Transaction";

//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//Routes
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);

const port = process.env.PORT || 9000;
const mongo = process.env.MONGO_URL as string;
mongoose.set('strictQuery', false);
mongoose.connect(mongo, {
    dbName: 'dashboard',
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions).then(()=>{
    app.listen(port, () => {
        console.log('server starts at', `${port}`)
    });
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
}).catch(error=>{
    console.log(error, 'not connected')
})
