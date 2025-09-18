import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepo: Repository<Folder>,
  ) {}

  async createFolder(dto: CreateFolderDto): Promise<Folder> {
    let parent: Folder | null = null;

    if (dto.parentId) {
      parent = await this.folderRepo.findOne({ where: { id: dto.parentId } });
      if (!parent) {
        throw new NotFoundException('Parent folder not found');
      }
    }

    const folder = this.folderRepo.create({
      name: dto.name,
      notation: dto.notation,
      isDraft: dto.isDraft ?? false,
      parent,
    });

    return this.folderRepo.save(folder);
  }

  async getFolderTree(id: string): Promise<Folder | null> {
    return this.folderRepo.findOne({
      where: { id },
      relations: ['children', 'children.children'], // recursive expansion
    });
  }

  async getAllRootFolders(): Promise<Folder[]> {
    return this.folderRepo.find({
      where: { parent: IsNull() },
      relations: ['children'],
    });
  }
}
