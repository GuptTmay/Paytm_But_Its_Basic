const express = require("express");
const cors = require("cors");
const rootRouter = require("./router/index");

const PORT = 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());
app.use("/api/v1/",  rootRouter);    



app.listen(PORT, () => {
    console.log("Starting the server at " + PORT + "!!");
})
