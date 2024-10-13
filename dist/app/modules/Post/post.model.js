"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String },
});
const PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    upvotesCount: { type: Number, default: 0 },
    upvotedUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, required: true },
    premium: { type: Boolean, default: false },
    comments: [CommentSchema],
}, {
    timestamps: true,
});
exports.PostModel = (0, mongoose_1.model)("post", PostSchema);
