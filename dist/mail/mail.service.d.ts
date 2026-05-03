import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly config;
    private readonly resend;
    private readonly from;
    private readonly logger;
    constructor(config: ConfigService);
    sendPasswordReset(to: string, name: string, resetUrl: string): Promise<void>;
    private buildResetEmailHtml;
    private buildResetEmailText;
}
