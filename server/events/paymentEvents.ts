import { EventEmitter } from "events";
import { sendEmail } from "../services/emailService";

const paymentEventEmitter = new EventEmitter();

// Define the payment success event
paymentEventEmitter.on("paymentSuccess", async (payment) => {
  console.log(`Payment successful: ${payment.transactionId}`);

  // Send a payment receipt email
  try {
    await sendEmail(
      payment.user.email,
      "Payment Receipt",
      `Hi ${payment.user.firstName},\n\nYour payment of ${payment.amount} ${payment.currency} was successful.\n\nTransaction ID: ${payment.transactionId}\n\nThank you for your purchase!`
    );
    console.log("Payment receipt email sent successfully");
  } catch (error) {
    console.error("Error sending payment receipt email:", error);
  }
});

// Define the payment failure event
paymentEventEmitter.on("paymentFailure", async (payment) => {
  console.log(`Payment failed: ${payment.transactionId}`);

  // Notify the user about the failure
  try {
    await sendEmail(
      payment.user.email,
      "Payment Failed",
      `Hi ${payment.user.firstName},\n\nYour payment of ${payment.amount} ${payment.currency} failed.\n\nPlease try again or contact support if the issue persists.\n\nThank you.`
    );
    console.log("Payment failure email sent successfully");
  } catch (error) {
    console.error("Error sending payment failure email:", error);
  }
});

// Export the event emitter
export { paymentEventEmitter };
