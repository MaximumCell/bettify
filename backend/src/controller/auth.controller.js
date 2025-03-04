import { User } from "../models/user.model.js";

export const authCallBack = async (req, res) => {
    try {
        console.log("📥 Received request body:", req.body); // Debugging log

        const { id, firstName, lastName, imageUrl, imageURL } = req.body; // ✅ Accept both cases

        const finalImageURL = imageURL || imageUrl || "https://example.com/default-avatar.png"; // ✅ Ensure `imageURL` is always defined
        console.log("🟢 Extracted imageURL:", finalImageURL); // Debug `imageURL` value

        if (!id || !firstName || !lastName) {
            console.error("🛑 Missing required fields:", { id, firstName, lastName });
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if user already exists
        let user = await User.findOne({ clerkId: id });

        if (!user) {
            console.log("🟡 User does not exist, creating new user...");

            user = new User({
                clerkId: id,
                fullName: `${firstName} ${lastName}`.trim(),
                imageURL: finalImageURL, // ✅ Save the correct image URL
            });

            await user.save(); // Save user to database
            console.log("✅ New user created:", user);
        } else {
            console.log("🟢 User already exists, updating imageURL if missing...");

            // ✅ If the user exists but has no `imageURL`, update it
            if (!user.imageURL) {
                user.imageURL = finalImageURL;
                await user.save();
                console.log("✅ Updated existing user with imageURL:", user);
            }
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("🔥 Error in auth callback:", error);
        res.status(500).json({ error: error.message });
    }
};
