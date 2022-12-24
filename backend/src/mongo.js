import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

mongoose.set("strictQuery", true);

async function connect() {
  // TODO 1 Connect to your MongoDB and call dataInit()
  //dotenv.config();
  mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then((res) => {
    console.log("mongo db connection created")
    dataInit();
  }
  );

  // TODO 1 End
}

export default { connect };
