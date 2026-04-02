//backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import router from './routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors(
    {origin: 'http://localhost:5173',
    credentials: true,
  }
));
app.use(cookieParser());
const Port = process.env.PORT || 3000;

app.use('/api/users', router);

connectdb()
    .then( () => {
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}`);
        })
    }).catch( (error) => {
        console.error("Failed to connect to the database:", error);
    });
