import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { RequestHandler } from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
}

bootstrap();

export default server as RequestHandler;
