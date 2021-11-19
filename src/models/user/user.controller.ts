import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(FirebaseAuthGuard)
  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.userService.registerUser(user)
  }
}
