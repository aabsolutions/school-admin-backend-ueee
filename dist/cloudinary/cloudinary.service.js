"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CloudinaryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const uuid_1 = require("uuid");
let CloudinaryService = CloudinaryService_1 = class CloudinaryService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(CloudinaryService_1.name);
        cloudinary_1.v2.config({
            cloud_name: this.config.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.config.get('CLOUDINARY_API_KEY'),
            api_secret: this.config.get('CLOUDINARY_API_SECRET'),
        });
    }
    uploadBuffer(buffer, folder) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                resource_type: 'auto',
                public_id: (0, uuid_1.v4)(),
                use_filename: false,
                overwrite: false,
            }, (error, result) => {
                if (error || !result) {
                    return reject(new common_1.InternalServerErrorException('Error al subir archivo a Cloudinary'));
                }
                resolve(result.secure_url);
            });
            const readable = new stream_1.Readable();
            readable.push(buffer);
            readable.push(null);
            readable.pipe(uploadStream);
        });
    }
    async deleteByUrl(url) {
        try {
            let resourceType = 'image';
            if (url.includes('/raw/'))
                resourceType = 'raw';
            if (url.includes('/video/'))
                resourceType = 'video';
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
            if (!match)
                return;
            let publicId = match[1];
            if (resourceType === 'image') {
                publicId = publicId.replace(/\.[^.]+$/, '');
            }
            await cloudinary_1.v2.uploader.destroy(publicId, { resource_type: resourceType });
        }
        catch {
            this.logger.warn(`Could not delete asset: ${url}`);
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = CloudinaryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map