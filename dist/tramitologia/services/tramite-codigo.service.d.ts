import { Connection } from 'mongoose';
export declare class TramiteCodigoService {
    private readonly connection;
    constructor(connection: Connection);
    nextCodigo(): Promise<string>;
}
