"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const UpvoteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
    upvotes: { type: Number, default: 0 }, // Default to 0
});
const PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    upvotesCount: { type: Number, default: 0 }, // Initialize count to 0
    upvotedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }], // Array of users who have upvoted
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.PostModel = (0, mongoose_1.model)("post", PostSchema);
