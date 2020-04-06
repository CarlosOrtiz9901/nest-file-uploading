import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './src/files',
  })
  ],
  controllers: [PublicationController],
  providers: [PublicationService],
})

export class PublicationModule {}
