import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/interface/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAllLogin() {
    return this.authService.getAllLogin();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.authService.getById(id);
  }
  @Post('signin')
  login(@Body() auth: Auth) {
    this.authService.login(auth);
    return { message: 'Login successfully' };
  }
}
