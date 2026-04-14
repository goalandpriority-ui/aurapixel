const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// 🔑 Replace with your keys
const KEY_SECRET = "YOUR_RAZORPAY_SECRET";

// 🔥 VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running 🚀");
});
