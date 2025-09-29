export interface SchemaValidationError {
    keyword: string;
    params: SchemaValidationErrorParameters;
}
declare type SchemaValidationErrorParameters = RefParams | LimitParams | AdditionalPropertiesParams | DependenciesParams | FormatParams | ComparisonParams | MultipleOfParams | PatternParams | RequiredParams | TypeParams | UniqueItemsParams | CustomParams | PatternRequiredParams | PropertyNamesParams | IfParams | SwitchParams | NoParams | EnumParams;
interface RefParams {
    ref: string;
}
interface LimitParams {
    limit: number;
}
interface AdditionalPropertiesParams {
    additionalProperty: string;
}
interface DependenciesParams {
    property: string;
    missingProperty: string;
    depsCount: number;
    deps: string;
}
interface FormatParams {
    format: string;
}
interface ComparisonParams {
    comparison: string;
    limit: number | string;
    exclusive: boolean;
}
interface MultipleOfParams {
    multipleOf: number;
}
interface PatternParams {
    pattern: string;
}
interface RequiredParams {
    missingProperty: string;
}
interface TypeParams {
    type: string;
}
interface UniqueItemsParams {
    i: number;
    j: number;
}
interface CustomParams {
    keyword: string;
}
interface PatternRequiredParams {
    missingPattern: string;
}
interface PropertyNamesParams {
    propertyName: string;
}
interface IfParams {
    failingKeyword: string;
}
interface SwitchParams {
    caseIndex: number;
}
interface NoParams {
}
interface EnumParams {
    allowedValues: any[];
}
export {};
