import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Folder } from 'src/folder/entities/folder.entity';
import * as path from 'path';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  private UPLOAD_ROOT = path.join(__dirname, '../../uploads');
  constructor(
    @InjectRepository(File) private fileRepo: Repository<File>,
    @InjectRepository(Folder) private folderRepo: Repository<Folder>,
  ) {}

  async uploadFile(folderId: string, file: Express.Multer.File) {
    const folder = await this.folderRepo.findOne({ where: { id: folderId } });
    if (!folder) {
      throw new NotFoundException(`Folder with id ${folder} not found`);
    }

    const folderPath = path.join(this.UPLOAD_ROOT, folderId);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileBuffer = join(folderPath, file.originalname);
    fs.writeFileSync(fileBuffer, file.buffer);

    const saveFile = this.fileRepo.create({
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: fileBuffer,
      folder,
    });

    return this.fileRepo.save(saveFile);
  }

  async getAllFiles() {
    return this.fileRepo.find({
      relations: ['folder'], // include folder info if you want
      order: { createdAt: 'DESC' }, // newest first
    });
  }
}
