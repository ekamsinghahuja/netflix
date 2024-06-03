const express = require('express');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const verify = require("./verify");
const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie");
const listRoute = require("./routes/list");
const app = express();

mongoose.connect("mongodb+srv://ekamsinghahuja123:xCRRbPYQPDOwfYLI@cluster0.vgeanih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
.then(() => {console.log('MongoDB connected');})
.catch(err => {console.error('MongoDB connection error:', err);});



app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/list",listRoute)

app.listen(8800,()=>{
    console.log("Backend server is running"); 
})

























//xCRRbPYQPDOwfYLI
//mongodb+srv://ekamsinghahuja123:xCRRbPYQPDOwfYLI@cluster0.vgeanih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0