// file.entity.ts
import { Folder } from 'src/folder/entities/folder.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid') // ✅ Primary key
  id: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  path: string; // local disk path or S3 key

  @ManyToOne(() => Folder, (folder) => folder.files, { onDelete: 'CASCADE' })
  folder: Folder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
