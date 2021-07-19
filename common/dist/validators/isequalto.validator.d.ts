import { ValidationOptions } from 'class-validator';
export declare function IsEqualTo(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
