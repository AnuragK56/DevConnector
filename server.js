const express = require("express");
const app = express();
const connectDB = require("./config/db");
//Connect DATABASE
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API.Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Sever Started on Port ${PORT}`));
