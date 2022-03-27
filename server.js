import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
const { json, urlencoded } = bodyParser;
import detect_POST from "./routes/detect_POST.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/detect", detect_POST);

app.listen(9000, () => console.log(`Server running at http://localhost:9000`));
