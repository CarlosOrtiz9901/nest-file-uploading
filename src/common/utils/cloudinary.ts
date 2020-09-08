import ConfigService from '../config/config.service';
const cloudinary = require('cloudinary').v2;
const fse = require('fs-extra');

export class Cloudinary {

  async uploadFile(path: string): Promise<any> {
    cloudinary.config({
      cloud_name: ConfigService.cloudinary_config.cloud_name,
      api_key: ConfigService.cloudinary_config.api_key,
      api_secret: ConfigService.cloudinary_config.api_secret
    });

    const response = await cloudinary.uploader.upload(path);

    return response.public_id, response.url;
  }

  async deleteFileLocal(path: any) {
    return await fse.unlink(path);
  }

}
export default new Cloudinary();
