/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
abstract class BaseJsonUtil implements JSON {
  [Symbol.toStringTag]: string = 'BaseJsonUtil';

  // eslint-disable-next-line class-methods-use-this
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
    return JSON.parse(text, reviver);
  }

  stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
  stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
  // eslint-disable-next-line class-methods-use-this
  stringify(value: unknown, replacer?: unknown, space?: unknown): string {
    return JSON.stringify(value, replacer as any, space as any);
  }

  abstract resolveRefs(json: object): any;
}

export default BaseJsonUtil;
