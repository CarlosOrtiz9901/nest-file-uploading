import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Res } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../utils/file-uploading.utils';
import { editFileName } from '../utils/editFileName.utils';
const multer = require('multer');

@Controller('publication')
export class PublicationController {

  constructor(private readonly publicationService: PublicationService) { }

  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  /*   @Post('file')
  @UseInterceptors(FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }))
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  } */

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('image', 20, {
    limits: { fileSize: 1000000 },
    storage: multer.diskStorage({
      destination: './src/files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files);
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './src/files' });
  }

}
