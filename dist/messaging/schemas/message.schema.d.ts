import { Document, Types } from 'mongoose';
export type MessageDocument = Message & Document;
export declare class ReadReceipt {
    userId: Types.ObjectId;
    readAt: Date;
}
export declare const ReadReceiptSchema: import("mongoose").Schema<ReadReceipt, import("mongoose").Model<ReadReceipt, any, any, any, any, any, ReadReceipt>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReadReceipt, Document<unknown, {}, ReadReceipt, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ReadReceipt, Document<unknown, {}, ReadReceipt, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    readAt?: import("mongoose").SchemaDefinitionProperty<Date, ReadReceipt, Document<unknown, {}, ReadReceipt, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ReadReceipt>;
export declare class Message {
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
    senderName: string;
    content: string;
    type: string;
    readBy: ReadReceipt[];
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, any, any, Message>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, Message, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    conversationId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    senderId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    senderName?: import("mongoose").SchemaDefinitionProperty<string, Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    content?: import("mongoose").SchemaDefinitionProperty<string, Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    type?: import("mongoose").SchemaDefinitionProperty<string, Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    readBy?: import("mongoose").SchemaDefinitionProperty<ReadReceipt[], Message, Document<unknown, {}, Message, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Message & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Message>;
