import { Document, Types } from 'mongoose';
export type TramiteHistoryDocument = TramiteHistory & Document;
export declare class TramiteHistory {
    tramiteId: Types.ObjectId;
    fromState: string;
    toState: string;
    actorUserId: Types.ObjectId;
    actorRole: string;
    observation: string;
}
export declare const TramiteHistorySchema: import("mongoose").Schema<TramiteHistory, import("mongoose").Model<TramiteHistory, any, any, any, any, any, TramiteHistory>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TramiteHistory, Document<unknown, {}, TramiteHistory, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tramiteId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fromState?: import("mongoose").SchemaDefinitionProperty<string, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    toState?: import("mongoose").SchemaDefinitionProperty<string, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    actorUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    actorRole?: import("mongoose").SchemaDefinitionProperty<string, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    observation?: import("mongoose").SchemaDefinitionProperty<string, TramiteHistory, Document<unknown, {}, TramiteHistory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TramiteHistory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, TramiteHistory>;
