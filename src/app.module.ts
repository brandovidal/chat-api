import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGODB_DEFAULT = {
  username: process.env.DATABASE_ROOT_USERNAME ?? 'root',
  password: process.env.DATABASE_ROOT_PASSWORD ?? 'admin',
  database: process.env.DATABASE_NAME ?? 'chat-db',
};
console.log('🚀 ~ MONGODB_DEFAULT:', MONGODB_DEFAULT);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(
      `mongodb://${MONGODB_DEFAULT.username}:${MONGODB_DEFAULT.password}@localhost:27017/${MONGODB_DEFAULT.database}?authSource=admin`,
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
