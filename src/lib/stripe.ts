import stripe from "stripe";

export default new stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});
