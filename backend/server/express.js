import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import webpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.config.client.js"
import webpack from "webpack";
import authRoutes from "./Routes/authRoutes.js"
import tourRoutes from "./Routes/tourRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import path from "path";


const CURRENT_WORKING_DIR = process.cwd();
const app = express();
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler,{
            publicPath: config.output.publicPath
});

app.use(devMiddleware);
app.use(WebpackHotMiddleware(compiler))


app.use(express.static(path.join(CURRENT_WORKING_DIR, "server/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", authRoutes);


app.use("/", userRoutes);
app.use("/", tourRoutes);

app.use((err, req, res, next) => {
    if(err){
        return res.status(401).json({
            error: err.inner.message + ", connection or token required"
        })
    }
})








export default app;