import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Res, Body } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../utils/file-uploading.utils';
import { editFileName } from '../utils/editFileName.utils';
import { CreateArchiveDto } from './dto/createarchive.dto';
const multer = require('multer');
const path = require('path');

@Controller('publication')
export class PublicationController {

  constructor(private readonly publicationService: PublicationService) { }

  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: multer.diskStorage({
        destination: path.join(__dirname, "files"),
        filename: editFileName,
      }),
      limits: { fieldSize: 1000000, fileSize: 1000000 },
      fileFilter: imageFileFilter,
    }))
  async upload(@Body() body: CreateArchiveDto, @UploadedFiles() files) {
    let params = files.map(item => ({ url: item.path, name: item.filename }));

    return this.publicationService.createArchive(body, params);
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
  } 

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('image', 20, {
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

  @Post('archive2')
  @UseInterceptors(FilesInterceptor('image', 20, {
    storage: multer.diskStorage({
      destination: './src/files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadMultipleFiles2(@UploadedFiles() files): Promise<any> {

    cloudinary.config({
      cloud_name: ConfigService.cloudinary_config.cloud_name,
      api_key: ConfigService.cloudinary_config.api_key,
      api_secret: ConfigService.cloudinary_config.api_secret
    });

    files.forEach(file => {

      cloudinary.uploader.upload(file.path,
        function (error, result) {
          if (!result)
            return { error }
          else
            return { result, body: { url: `${result.url}` + ' ', publicId: result.public_id } }
        });
    });

    return { success: 'OK' }
  }*/

}
