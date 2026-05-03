import { Document, Types } from 'mongoose';
export type ConversationDocument = Conversation & Document;
export declare class ConversationParticipant {
    userId: Types.ObjectId;
    role: string;
    name: string;
    avatar?: string;
}
export declare const ConversationParticipantSchema: import("mongoose").Schema<ConversationParticipant, import("mongoose").Model<ConversationParticipant, any, any, any, any, any, ConversationParticipant>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversationParticipant, Document<unknown, {}, ConversationParticipant, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ConversationParticipant & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ConversationParticipant, Document<unknown, {}, ConversationParticipant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationParticipant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    role?: import("mongoose").SchemaDefinitionProperty<string, ConversationParticipant, Document<unknown, {}, ConversationParticipant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationParticipant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: import("mongoose").SchemaDefinitionProperty<string, ConversationParticipant, Document<unknown, {}, ConversationParticipant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationParticipant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    avatar?: import("mongoose").SchemaDefinitionProperty<string, ConversationParticipant, Document<unknown, {}, ConversationParticipant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationParticipant & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ConversationParticipant>;
export declare class Conversation {
    type: string;
    participants: ConversationParticipant[];
    name?: string;
    lastMessage?: Types.ObjectId;
    createdBy: Types.ObjectId;
}
export declare const ConversationSchema: import("mongoose").Schema<Conversation, import("mongoose").Model<Conversation, any, any, any, any, any, Conversation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Conversation, Document<unknown, {}, Conversation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    type?: import("mongoose").SchemaDefinitionProperty<string, Conversation, Document<unknown, {}, Conversation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    participants?: import("mongoose").SchemaDefinitionProperty<ConversationParticipant[], Conversation, Document<unknown, {}, Conversation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: import("mongoose").SchemaDefinitionProperty<string, Conversation, Document<unknown, {}, Conversation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    lastMessage?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Conversation, Document<unknown, {}, Conversation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Conversation, Document<unknown, {}, Conversation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Conversation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Conversation>;
