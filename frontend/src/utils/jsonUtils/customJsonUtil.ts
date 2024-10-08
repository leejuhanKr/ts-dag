/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseJsonUtil from './baseJsonUtil';

class CustomJsonUtil extends BaseJsonUtil {
  // eslint-disable-next-line class-methods-use-this
  resolveRefs(json: object): unknown {
    return CustomJsonUtil.resolveReferences(json);
  }

  private static resolveReferences = (json: object): any => {
    const resolveRef = (ref: string, root: object): object => {
      const parts = ref.split('/').slice(1);
      let result: { [key: string]: any } = root;
      // eslint-disable-next-line no-restricted-syntax
      for (const part of parts) {
        if (result && part in result) {
          result = result[part];
        } else {
          throw new Error(`Could not resolve reference ${ref}`);
        }
      }
      return result;
    };

    const resolveObject = (obj: any, root: object): any => {
      if (Array.isArray(obj)) {
        return obj.map((item) => resolveObject(item, root));
      }
      if (obj !== null && typeof obj === 'object') {
        if (obj.$ref) {
          return resolveObject(resolveRef(obj.$ref, root), root);
        }
        return Object.keys(obj).reduce(
          (acc: { [key: string]: any }, key) => {
            acc[key] = resolveObject(obj[key], root);
            return acc;
          },
          {} as { [key: string]: any },
        );
      }
      return obj;
    };

    return resolveObject(json, json);
  };
}

export default CustomJsonUtil;
