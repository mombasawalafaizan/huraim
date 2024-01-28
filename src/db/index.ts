import mongoose from "mongoose";

const url = process.env.MONGODB_URI as string;

const connectionParams = {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: true,
  //   autoIndex: true,
};

const connect = async () => {
  try {
    await mongoose.connect(url, connectionParams);
    console.log("Mongo connection successful");
  } catch (err) {
    throw new Error("Error in connecting to MongoDB: \n" + err);
  }
};

export default connect;
