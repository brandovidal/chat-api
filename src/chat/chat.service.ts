import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';

import { Chat, ChatDocument } from '../schemas/chat.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel({
      participants: createChatDto.participants,
      messages: [],
    });
    return newChat.save();
  }

  async getChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({ participants: userId })
      .populate('participants', 'username')
      .exec();
  }

  async getChatDetails(chatId: string): Promise<Chat> {
    return this.chatModel
      .findById(chatId)
      .populate('participants', 'username')
      .populate('messages.sender', 'username')
      .exec();
  }
}
