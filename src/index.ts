import express from "express";
import cors from "cors";
import { PORT } from "./constants";
import { router } from "./router";
import morgan from "morgan";

const app = express();

app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);

app.listen(app.get("port"), () => {
	console.log("Server on port: ", app.get("port"));
});
