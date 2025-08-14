import express from "express";
import cors from "cors";


const app = express();

app.use(cors({origin: "https://isro-game",
    methods:["GET", "POST","DELETE"],
    credentials:true
}));