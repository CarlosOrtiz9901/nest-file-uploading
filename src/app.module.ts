import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    MulterModule.register({ storage: './files', limits: { fieldSize: 1000000 } }),
    PublicationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
