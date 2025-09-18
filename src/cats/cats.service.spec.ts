//src/cats/cats.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
    let service: CatsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatsService],
        }).compile();

        service = module.get < CatsService > (CatsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all cats', () => {
        const cats = service.findAll();
        expect(cats).toEqual(['Tom', 'Felix']);
    });

    it('should add a new cat', () => {
        service.addCat('Garfield');
        const cats = service.findAll();
        expect(cats).toContain('Garfield');
    });
});