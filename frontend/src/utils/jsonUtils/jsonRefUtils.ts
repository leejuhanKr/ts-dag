/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */

import * as fs from 'fs';
import * as path from 'path';
import pkg, { ErrorSchema, RJSFSchema, RJSFValidationError, ValidatorType } from '@rjsf/utils';

const { retrieveSchema } = pkg;

const resolveReferences = (json: object): any => {
  const resolveRef = (ref: string, root: object): object => {
    const parts = ref.split('/').slice(1);
    let result: { [key: string]: any } = root;
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

const jsonData1: RJSFSchema = {
  type: 'object',
  properties: {
    foo: { type: 'string' },
    bar: { $ref: '#/properties/foo' },
  },
} as RJSFSchema;
// const jsonData1: RJSFSchema = {
//   $id: 'https://example.com/schemas/customer',
//   type: 'object',
//   properties: {
//     first_name: { type: 'string' },
//     last_name: { type: 'string' },
//     shipping_address: { $ref: '/schemas/address' },
//     billing_address: { $ref: '/schemas/address' },
//   },
//   required: ['first_name', 'last_name', 'shipping_address', 'billing_address'],
// } as RJSFSchema;

const foo = () => {
  const generated = resolveReferences(jsonData1);
  // generated를 ./generated.json에 저장
  const filePath = path.join('/Users/juhan/Workspace/dag/frontend/src/utils/jsonUtils', 'generated.json');
  fs.writeFileSync(filePath, JSON.stringify(generated, null, 2), 'utf-8');
  console.log(`Generated JSON saved to ${filePath}`);
};

const bar = () => {
  // Load your main schema
  const schema = JSON.parse(
    fs.readFileSync('/Users/juhan/Workspace/dag/frontend/src/utils/jsonUtils/data/data.json', 'utf-8'),
  );
  // const schema;
  // const schema = jsonData1;
  const validator: ValidatorType = {
    isValid: () => true,
    validateFormData: () => ({ errors: [], errorSchema: {} }),
    toErrorList(_errorSchema?: ErrorSchema<any> | undefined, _fieldPath?: string[]): RJSFValidationError[] {
      throw new Error('Function not implemented.');
    },
    rawValidation<Result = any>(
      _schema: RJSFSchema,
      _formData?: any,
    ): { errors?: Result[] | undefined; validationError?: Error } {
      throw new Error('Function not implemented.');
    },
  };

  // If you have additional schemas that are referenced, you can add them here
  const referenceSchemas = {
    // "schemaId": JSON.parse(fs.readFileSync('path/to/referenced/schema.json', 'utf-8')),
  };

  // Resolve $refs
  const resolvedSchema = retrieveSchema(validator, schema, referenceSchemas);

  console.log(JSON.stringify(resolvedSchema, null, 2));
  fs.writeFileSync('resolvedSchema.json', JSON.stringify(resolvedSchema, null, 2));
};

const main = { foo, bar }.bar;
main();
