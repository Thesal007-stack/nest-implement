import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './entities/folder.entity';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async create(@Body() dto: CreateFolderDto): Promise<Folder> {
    return this.folderService.createFolder(dto);
  }

  @Get(':id/tree')
  async getTree(@Param('id') id: string): Promise<Folder | null> {
    return this.folderService.getFolderTree(id);
  }

  @Get()
  async getRoots(): Promise<Folder[]> {
    return this.folderService.getAllRootFolders();
  }
}
