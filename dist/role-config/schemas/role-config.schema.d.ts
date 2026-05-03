import { Document } from 'mongoose';
export type RoleConfigDocument = RoleConfig & Document;
export declare class RoleConfig {
    name: string;
    displayName: string;
    description: string;
    isSystem: boolean;
    sidebarPermissions: string[];
    priority: number;
}
export declare const RoleConfigSchema: import("mongoose").Schema<RoleConfig, import("mongoose").Model<RoleConfig, any, any, any, any, any, RoleConfig>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RoleConfig, Document<unknown, {}, RoleConfig, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    displayName?: import("mongoose").SchemaDefinitionProperty<string, RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isSystem?: import("mongoose").SchemaDefinitionProperty<boolean, RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    sidebarPermissions?: import("mongoose").SchemaDefinitionProperty<string[], RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    priority?: import("mongoose").SchemaDefinitionProperty<number, RoleConfig, Document<unknown, {}, RoleConfig, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RoleConfig & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, RoleConfig>;
