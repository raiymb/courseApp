import { EventEmitter } from "events";
import { sendEmail } from "../services/emailService";

const userEventEmitter = new EventEmitter();

// Define the user registration event
userEventEmitter.on("userRegistered", async (user) => {
  console.log(`User registered: ${user.email}`);

  // Send a welcome email
  try {
    await sendEmail(
      user.email,
      "Welcome to Our Platform!",
      `Hi ${user.firstName},\n\nThank you for registering on our platform. We're excited to have you on board!`
    );
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
});

// Define other user-related events as needed
userEventEmitter.on("passwordChanged", async (user) => {
  console.log(`Password changed for user: ${user.email}`);

  try {
    await sendEmail(
      user.email,
      "Password Changed Successfully",
      `Hi ${user.firstName},\n\nYour password has been successfully updated. If you did not make this change, please contact support immediately.`
    );
    console.log("Password change notification email sent successfully");
  } catch (error) {
    console.error("Error sending password change email:", error);
  }
});

// Export the event emitter
export { userEventEmitter };
