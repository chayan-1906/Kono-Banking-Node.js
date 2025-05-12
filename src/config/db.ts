import mongoose from "mongoose";
import {MONGODB_URI} from "./config";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log(`Connected to database ${mongoose.connection.host}`.bgYellow.black.bold);
    } catch (error) {
        console.log('inside catch of connectDB:'.bgRed.white.bold, error);
    }
}

export {connectDB};
