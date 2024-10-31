import express from "express";
import cors from "cors";
import { PORT } from "./shared/constants";
import { router } from "./router";
import morgan from "morgan";
import path from "node:path";

const app = express();

app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.listen(app.get("port"), () => {
	console.log("Server on port: ", app.get("port"));
});
