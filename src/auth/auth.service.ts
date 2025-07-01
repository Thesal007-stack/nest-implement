import { Injectable } from '@nestjs/common';
import { Auth } from 'src/interface/auth';
@Injectable()
export class AuthService {
  private readonly auths: Auth[] = [];
  getAllLogin(): Auth[] {
    return this.auths;
  }
  getById(id: string): Auth | undefined {
    return this.auths.find((auth) => auth.id === String(id));
  }
  login(auth: Auth) {
    this.auths.push(auth);
  }
}
