import http from "http";
import app from "./app";
import { mongoConnect } from "services/mongo";

const PORT = 3001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
