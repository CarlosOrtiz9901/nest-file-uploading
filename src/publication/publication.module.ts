import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [PublicationService],
})

export class PublicationModule {}
