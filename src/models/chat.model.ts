import { Schema } from 'mongoose';

export const ChatModel = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
