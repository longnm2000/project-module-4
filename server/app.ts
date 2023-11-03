import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import pictureRoutes from './routes/picture.routes'
import orderRoutes from './routes/order.routes';
import manufacturerRoutes from "./routes/manufacturer.routes";
import resolutionRoutes from "./routes/resolution.routes";
import refreshRateRoutes from './routes/refreshRate.routes'
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/monitors', productRoutes);
app.use('/api/v1/pictures', pictureRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use("/api/v1/manufacturers", manufacturerRoutes);
app.use("/api/v1/resolutions", resolutionRoutes);
app.use("/api/v1/refreshrates", refreshRateRoutes);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
