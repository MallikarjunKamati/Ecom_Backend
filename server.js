const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use("/auth", authRoutes);
//Routes
app.get("/",(req,res) => {
   res.status(200).json({
      success: "true",
   message: "server is running fine and good",
   });
});


app.use("/products", productRoutes)
app.use("/cart", cartRoutes)
//mongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
