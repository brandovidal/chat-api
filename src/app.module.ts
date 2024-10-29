import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, AuthModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
