"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const compression = require('compression');
const helmet = require('helmet');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet());
    app.use(compression());
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.setGlobalPrefix('api');
    const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:4200';
    app.enableCors({
        origin: corsOrigin.split(',').map((o) => o.trim()),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    const logger = new common_1.Logger('Bootstrap');
    logger.log(`Server running on http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map