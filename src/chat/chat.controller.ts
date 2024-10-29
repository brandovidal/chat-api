import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Param,
} from '@nestjs/common';

import { ChatService } from './chat.service';
import { Chat } from '../schemas/chat.schema';

import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async getChats(@Request() req): Promise<Chat[]> {
    return this.chatService.getChats(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  async getChatDetails(@Param('chatId') chatId: string): Promise<Chat> {
    return this.chatService.getChatDetails(chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Request() req,
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<Chat> {
    return this.chatService.sendMessage(
      chatId,
      req.user.userId,
      sendMessageDto,
    );
  }
}
