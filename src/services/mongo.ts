import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/bycbdmongo";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

export async function mongoConnect(): Promise<void> {
  await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect(): Promise<void> {
  await mongoose.disconnect();
}
