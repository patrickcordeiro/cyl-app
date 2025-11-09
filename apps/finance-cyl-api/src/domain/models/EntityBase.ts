import { ValidationError } from '@application/errors';
import { isValidDate } from '@shared/utils';
import { RequestContextDto } from '@cyl-app/dto';

interface IEntity {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type TypeSettersDictionary<T> = Record<keyof T, Function>;

export interface IEntityBase {
  id: string;
  createdBy: string;
  createdAt?: Date;
  updatedBy: string | null;
  updatedAt: Date | null;
  active?: boolean;
}

export abstract class EntityBase {
  readonly id: string;
  readonly createdBy: string;
  readonly createdAt: Date;
  readonly active: boolean;
  protected updatedBy: string | null;
  protected updatedAt: Date | null;

  protected constructor(props: IEntityBase) {
    this.id = props.id;
    this.createdBy = props.createdBy;
    this.createdAt = props.createdAt || new Date();
    this.updatedBy = props.updatedBy;
    this.updatedAt = props.updatedAt;
    this.active = props.active ?? true;
  }

  abstract validate(): void;

  /* #region Getters */

  public getUpdatedBy(): string | null {
    return this.updatedBy;
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  /* #endregion */

  /* #region Setters */

  protected setString(string: string, field: string) {
    if (typeof string !== 'string' || !string) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, string>)[field] = string;
  }

  protected setNullableString(string: string | null, field: string) {
    if (typeof string !== 'string' && string !== null) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, string | null>)[field] = string;
  }

  protected setNumber(number: number, field: string) {
    if (typeof number !== 'number' || (!number && number !== 0)) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, number>)[field] = number;
  }

  protected setNullableNumber(number: number | null, field: string) {
    if (typeof number !== 'number' && number !== null) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, number | null>)[field] = number;
  }

  protected setDate(date: Date, field: string) {
    if (!isValidDate(date)) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, Date>)[field] = date;
  }

  protected setNullableDate(date: Date | null, field: string) {
    if (date && !isValidDate(date) && date !== null) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, Date | null>)[field] = date;
  }

  protected setBoolean(boolean: boolean, field: string) {
    if (
      typeof boolean !== 'boolean' ||
      boolean === null ||
      boolean === undefined
    ) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, boolean>)[field] = boolean;
  }

  protected setEnum(value: any, options: any[], field: string) {
    if (options.indexOf(value) === -1) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, unknown>)[field] = value;
  }

  protected setNullableEnum(value: any, options: any[], field: string) {
    if (options.indexOf(value) === -1 && value !== null) {
      throw new ValidationError([field]);
    }
    ((<unknown>this) as Record<string, unknown>)[field] = value;
  }

  protected setRelation<T extends IEntity>(
    relation: T,
    constructor: { new (...args: any[]): T },
    field: string
  ) {
    if (!(relation instanceof constructor) || !relation) {
      throw new ValidationError([field]);
    }
    if (relation instanceof constructor && !relation.id) {
      throw new ValidationError([`${field}.id`]);
    }
    ((<unknown>this) as Record<string, T>)[field] = relation;
  }

  protected setNullableRelation<T extends IEntity>(
    relation: T | null,
    constructor: { new (...args: any[]): T },
    field: string
  ) {
    if (!(relation instanceof constructor) && relation !== null) {
      throw new ValidationError([field]);
    }
    if (relation instanceof constructor && !relation.id) {
      throw new ValidationError([`${field}.id`]);
    }
    ((<unknown>this) as Record<string, T | null>)[field] = relation;
  }

  protected setUpdated({ user }: RequestContextDto) {
    this.updatedAt = new Date();
    this.updatedBy = user.id;
  }

  /* #endregion */

  protected applyChanges<T extends object>(
    entity: T,
    settersDictionary: TypeSettersDictionary<T>,
    contextParams: RequestContextDto
  ) {
    Object.entries(entity).forEach(([key, value]) => {
      if (
        settersDictionary[key as keyof T] &&
        settersDictionary[key as keyof T] !== undefined &&
        value !== undefined
      ) {
        settersDictionary[key as keyof T].bind(this)(value, contextParams);
      }
    });
    this.setUpdated(contextParams);
  }

  public isSame(entity: EntityBase): boolean {
    return entity?.id ? entity.id === this.id : false;
  }
}
