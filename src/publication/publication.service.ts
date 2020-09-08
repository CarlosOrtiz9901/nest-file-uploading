import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { archive } from '../entities/archive';
import { publication } from '../entities/publication';
import { CreateArchiveDto } from './dto/createarchive.dto';
import { type_publication } from '../entities/type_publication';
const bufferFrom = require('buffer-from');
const fse = require('fs-extra');
const fs = require('fs');

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(publication) private readonly publicationRepository: Repository<publication>,
    @InjectRepository(archive) private readonly archiveRepository: Repository<archive>,
    @InjectRepository(type_publication) private readonly typePublicationRepository: Repository<type_publication>,
  ) { }

  async createArchive(body: CreateArchiveDto, params) {

    if (!body.typePublicationId)
      return { error: 'TYPE_PUBLICATION_NOT_EXIST', detail: '¡El tipo de publicación no existe!' }

    try {
      const publicaion = await this.publicationRepository.save({
        detail: body.detail,
        typePublication: { id: body.typePublicationId },
      });

      params.forEach(file => {
        const binaryData = fs.readFileSync(file.url)
        const base64String = bufferFrom(binaryData).toString('base64');

        this.archiveRepository.save({
          url: file.url,
          data: base64String,
          publication: { id: publicaion.id },
        });

        this.deleteFileLocal(file.url);

      });

      return { success: 'OK' };
    } catch (error) {
      return error;
    }
  }

  async getAll(typePublicationId: number) {
    return await this.typePublicationRepository.find({
      relations: ['publications', 'publications.archives'],
      where: { id: typePublicationId }
    })
  }

  private async deleteFileLocal(path: string) {
    return await fse.unlink(path);
  }
}
