import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('files')
export class fileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }

  @Post(':folderId/upload')
  @ApiOperation({ summary: 'Upload a file into a folder' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // 👈 this makes Swagger show a file picker
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('folderId') folderId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(folderId, file);
  }
}
