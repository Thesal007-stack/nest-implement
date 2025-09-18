import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { fileController } from './file.controller';
import { Folder } from 'src/folder/entities/folder.entity';
@Module({
  imports: [TypeOrmModule.forFeature([File, Folder])],
  providers: [FileService],
  controllers: [fileController],
  exports: [FileService],
})
export class FileModule {}
