import { Injectable } from '@nestjs/common';
import { SYSTEM_VARIABLES } from '../constants/system-variables';
import { VariableConfig } from '../schemas/plantilla.schema';

const VAR_REGEX = /\[([A-Z][A-Z0-9_]{0,49})\]/g;

export interface ParsedVariables {
  systemVars: string[];
  customVars: string[];
  allMatches: string[];
}

@Injectable()
export class VariableParserService {
  parse(bodyHtml: string): ParsedVariables {
    const matches = [...bodyHtml.matchAll(VAR_REGEX)].map((m) => m[1]);
    const unique = [...new Set(matches)];
    const sysSet = new Set<string>(SYSTEM_VARIABLES);
    const systemVars = unique.filter((v) => sysSet.has(v));
    const customVars = unique.filter((v) => !sysSet.has(v));
    return { systemVars, customVars, allMatches: unique };
  }

  mergeWithExistingConfig(parsed: ParsedVariables, existing: VariableConfig[]): VariableConfig[] {
    const existingMap = new Map(existing.map((v) => [v.key, v]));
    return parsed.customVars.map((key, idx) => {
      if (existingMap.has(key)) return existingMap.get(key)!;
      return {
        key,
        label: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
        fieldType: 'text' as const,
        required: true,
        options: [],
        defaultValue: undefined,
        placeholder: undefined,
        order: idx,
      };
    });
  }
}
