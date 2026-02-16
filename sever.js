import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// ✅ MongoDB Connection
// -------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// -------------------------------
// ✅ Order Schema
// -------------------------------
const orderSchema = new mongoose.Schema({
  restaurantId: String,
  name: String,
  email: String,
  upiId: String,
  items: Array,
  total: Number,
  orderType: String,
  paymentStatus: String,
  paymentMethod: String,
  createdAt: String,
});

const Order = mongoose.model("Order", orderSchema);

// -------------------------------
// ✅ Routes
// -------------------------------

// ✔️ Homepage (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✔️ Save order from frontend
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "✅ Order saved successfully", order });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order" });
  }
});

// ✔️ Get all orders (admin page)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// -------------------------------
// OPTIONAL: Serve frontend files
// Put your HTML files in: backend/public/
// -------------------------------
app.use(express.static("public"));

// -------------------------------
// Start server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
