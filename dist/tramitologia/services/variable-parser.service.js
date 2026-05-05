"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableParserService = void 0;
const common_1 = require("@nestjs/common");
const system_variables_1 = require("../constants/system-variables");
const VAR_REGEX = /\[([A-Z][A-Z0-9_]{0,49})\]/g;
let VariableParserService = class VariableParserService {
    parse(bodyHtml) {
        const matches = [...bodyHtml.matchAll(VAR_REGEX)].map((m) => m[1]);
        const unique = [...new Set(matches)];
        const sysSet = new Set(system_variables_1.SYSTEM_VARIABLES);
        const systemVars = unique.filter((v) => sysSet.has(v));
        const customVars = unique.filter((v) => !sysSet.has(v));
        return { systemVars, customVars, allMatches: unique };
    }
    mergeWithExistingConfig(parsed, existing) {
        const existingMap = new Map(existing.map((v) => [v.key, v]));
        return parsed.customVars.map((key, idx) => {
            if (existingMap.has(key))
                return existingMap.get(key);
            return {
                key,
                label: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
                fieldType: 'text',
                required: true,
                options: [],
                defaultValue: undefined,
                placeholder: undefined,
                order: idx,
            };
        });
    }
};
exports.VariableParserService = VariableParserService;
exports.VariableParserService = VariableParserService = __decorate([
    (0, common_1.Injectable)()
], VariableParserService);
//# sourceMappingURL=variable-parser.service.js.map