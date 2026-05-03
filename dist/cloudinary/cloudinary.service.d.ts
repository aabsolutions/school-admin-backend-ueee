import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private config;
    private readonly logger;
    constructor(config: ConfigService);
    uploadBuffer(buffer: Buffer, folder: string): Promise<string>;
    deleteByUrl(url: string): Promise<void>;
}
