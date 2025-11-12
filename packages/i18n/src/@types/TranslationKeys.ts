import { TranslationType } from './TranslationType.js';

/* Move */
export type NestedKeyOf<ObjectType> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends object
    ? `${string & Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${string & Key}`;
}[keyof ObjectType];

export type TranslationKeys = NestedKeyOf<TranslationType>;
