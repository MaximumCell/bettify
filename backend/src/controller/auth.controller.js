import { User } from "../models/user.model.js";

export const authCallBack = async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debugging log

        const { id, firstName, lastName, imageUrl } = req.body;

        if (!id || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // 🔹 Check if user already exists
        let user = await User.findOne({ clerkId: id });

        if (!user) {
            user = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl: imageUrl || "https://example.com/default-avatar.png", // Default image
            });
            console.log("New user created:", user);
        } else {
            console.log("User already exists:", user);
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error in auth callback:", error);
        res.status(500).json({ error: error.message }); // Send error response
    }
};
