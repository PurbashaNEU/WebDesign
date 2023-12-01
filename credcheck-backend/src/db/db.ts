import { connect } from "mongoose";


export const connectDb = async ()=>{
    try{
        await connect('mongodb://127.0.0.1:27017/credcheck');
        console.log("DB connected");
    }catch(e){
        console.log("Error connecting Mongo --->>> ", e);
    }
}

// Safer way to get disconnected
// export const disconnect = () => {
//     if (!database) {
//         return;
//     }
  
//     Mongoose.disconnect();
// };

