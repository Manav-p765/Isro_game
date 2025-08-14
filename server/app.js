import cors from "cors";
app.use(cors({origin: "https://isro-game",
    methods:["GET", "POST","DELETE"],
    credentials:true
}));