import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  _id?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: [{ type: Object }] })
  messages: { sender: Types.ObjectId; content: string; timestamp: Date }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
