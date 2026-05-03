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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let MailService = MailService_1 = class MailService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(MailService_1.name);
        this.resend = new resend_1.Resend(config.get('RESEND_API_KEY'));
        this.from = config.get('RESEND_FROM_EMAIL', 'onboarding@resend.dev');
    }
    async sendPasswordReset(to, name, resetUrl) {
        const { error } = await this.resend.emails.send({
            from: this.from,
            to,
            subject: 'Restablecer contraseña — School Admin',
            html: this.buildResetEmailHtml(name, resetUrl),
            text: this.buildResetEmailText(name, resetUrl),
        });
        if (error) {
            this.logger.error(`Error sending reset email to ${to}: ${JSON.stringify(error)}`);
            throw new Error('No se pudo enviar el email de recuperación');
        }
    }
    buildResetEmailHtml(name, resetUrl) {
        return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: Arial, sans-serif; background: #f4f6f8; margin: 0; padding: 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="540" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#1565C0; padding:32px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:600;">School Admin</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px;">
              <p style="color:#374151; font-size:16px; margin:0 0 16px;">Hola, <strong>${name}</strong></p>
              <p style="color:#374151; font-size:16px; margin:0 0 32px;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta.
                Este enlace es válido por <strong>15 minutos</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}"
                       style="background:#1565C0; color:#ffffff; text-decoration:none;
                              padding:14px 32px; border-radius:6px; font-size:15px;
                              font-weight:600; display:inline-block;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#6b7280; font-size:13px; margin:32px 0 0; line-height:1.6;">
                Si no solicitaste este cambio, podés ignorar este email.<br>
                Tu contraseña no será modificada.
              </p>
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:32px 0;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                Si el botón no funciona, copiá este enlace en tu navegador:<br>
                <span style="color:#1565C0; word-break:break-all;">${resetUrl}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb; padding:20px 48px; text-align:center;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
                © ${new Date().getFullYear()} School Admin. Este es un email automático.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }
    buildResetEmailText(name, resetUrl) {
        return `Hola ${name},\n\nRecibimos una solicitud para restablecer tu contraseña.\n\nEste enlace es válido por 15 minutos:\n${resetUrl}\n\nSi no solicitaste este cambio, podés ignorar este email.\n\n© ${new Date().getFullYear()} School Admin`;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map