import { VariableConfig } from '../schemas/plantilla.schema';
export interface ParsedVariables {
    systemVars: string[];
    customVars: string[];
    allMatches: string[];
}
export declare class VariableParserService {
    parse(bodyHtml: string): ParsedVariables;
    mergeWithExistingConfig(parsed: ParsedVariables, existing: VariableConfig[]): VariableConfig[];
}
