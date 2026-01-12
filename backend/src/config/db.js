import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected DB Successfully!");
    }
    catch(e){
        console.log("Error",e);
        process.exit(1);// exit with error
    }
}