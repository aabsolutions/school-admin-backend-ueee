import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CloudinaryService {
  constructor(private config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key:    this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Uploads a file buffer to Cloudinary using resource_type 'auto'.
   * Cloudinary auto-detects the type (image, video, raw/pdf/doc).
   * The returned secure_url already contains the correct format extension.
   */
  uploadBuffer(buffer: Buffer, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',   // handles images, PDFs and docs without restrictions
          public_id: uuidv4(),
          use_filename: false,
          overwrite: false,
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(new InternalServerErrorException('Error al subir archivo a Cloudinary'));
          }
          resolve(result.secure_url);
        },
      );

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  /**
   * Deletes a file from Cloudinary by its secure URL.
   * Supports image, video and raw resource types by reading the URL path segment.
   */
  async deleteByUrl(url: string): Promise<void> {
    try {
      // Detect resource type from URL: /image/, /video/, /raw/
      let resourceType: 'image' | 'video' | 'raw' = 'image';
      if (url.includes('/raw/'))   resourceType = 'raw';
      if (url.includes('/video/')) resourceType = 'video';

      // Extract public_id: everything after /upload/vNNN/ (or /upload/)
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
      if (!match) return;

      let publicId = match[1];

      // For images: Cloudinary strips the extension from public_id on destroy
      // For raw/video: extension IS part of the public_id — keep as-is
      if (resourceType === 'image') {
        publicId = publicId.replace(/\.[^.]+$/, '');
      }

      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch {
      console.warn(`CloudinaryService: could not delete ${url}`);
    }
  }
}
