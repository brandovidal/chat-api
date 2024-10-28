import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password } = registerUserDto;

    // check the user exist
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('user ALready exists');
    }

    const salt = await bcrypt.gentSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({ username, password: hashedPassword });
    return newUser.save();
  }
}
