import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';

const MONGODB_DEFAULT = {
  username: process.env.MONGO_INITDB_ROOT_USERNAME ?? 'root',
  password: process.env.MONGO_INITDB_ROOT_PASSWORD ?? 'admin',
  database: process.env.MONGO_INITDB_DATABASE ?? 'chat-db',
};
console.log('🚀 ~ MONGODB_DEFAULT:', MONGODB_DEFAULT);

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${MONGODB_DEFAULT.username}:${MONGODB_DEFAULT.password}@localhost:27017/${MONGODB_DEFAULT.database}?authSource=admin`,
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
