import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TramiteCodigoService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async nextCodigo(): Promise<string> {
    const year = new Date().getFullYear();
    const counterId = `tramite-${year}`;
    const result = await this.connection
      .collection('counters')
      .findOneAndUpdate(
        { _id: counterId } as any,
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' },
      );
    const seq: number = (result as any)?.seq ?? 1;
    return `TRA-${year}-${String(seq).padStart(6, '0')}`;
  }
}
