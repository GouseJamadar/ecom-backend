require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");



const app = express();
const allowedOrigins =[
    "https://ecom-frontend-murex-ten.vercel.app/",
    "ecom-frontend-9g7oape92-mohammed-gouses-projects.vercel.app"
]
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies and authentication headers if needed
  })
)

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/checkout", require("./routes/paymentRoutes"));
app.get('/',(req,res)=>{
    res.send("getting the server")
})

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
