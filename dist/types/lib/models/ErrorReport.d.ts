import { SchemaValidationError } from './ValidationError';
/**
 * The JSON Schema errors that have been discovered on your set value.
 */
export declare type ErrorReport = {
    message: string;
    pointer: string;
    schema: {
        id: string;
        pointer: string;
    };
    data: SchemaValidationError;
};
