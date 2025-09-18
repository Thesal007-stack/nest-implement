//src/cats/cats.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: string[] = ['Tom', 'Felix'];

  findAll(): string[] {
    return this.cats;
  }

  addCat(cat: string): void {
    this.cats.push(cat);
  }
}
