const stripe = require("stripe")(
	"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"
);
const express = require("express");
const app = express();
app.use(express.static("."));
const YOUR_DOMAIN = "http://localhost:4242";
app.post("/create-checkout-session", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price: "price_1I3nxjELBcm8zgUaM0DqzTU7",
				quantity: 1,
			},
		],
		allow_promotion_codes: true,
		mode: "payment",
		success_url: `${YOUR_DOMAIN}/success.html`,
		cancel_url: `${YOUR_DOMAIN}/cancel.html`,
	});
	res.json({ id: session.id });
});

app.get("/", async (req, res) => {
	const stripe = require("stripe")(
		"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"
	);

	const promotionCodes = await stripe.promotionCodes.list({
		limit: 3,
	});
	res.send(promotionCodes);
});
app.listen(4242, () => console.log("Running on port 4242"));
