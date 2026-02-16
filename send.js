// Node.js Express endpoint
const express = require("express");
const twilio = require("twilio");

const accountSid = "TWILIO_SID";
const authToken = "TWILIO_AUTH";
const client = twilio(accountSid, authToken);
const app = express();
app.use(express.json());

app.post("/send-order", async (req, res) => {
  const { customerNumber, kitchenNumber, orderItems, total } = req.body;

  // Message for customer
  await client.messages.create({
    body: `📱 Order Confirmed! Items: ${orderItems}\nTotal: ₹${total}`,
    from: "+1234567890",
    to: customerNumber
  });

  // Message for kitchen
  await client.messages.create({
    body: `🍗 New Order! Items: ${orderItems}\nTotal: ₹${total}`,
    from: "+1234567890",
    to: kitchenNumber
  });

  res.send({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
