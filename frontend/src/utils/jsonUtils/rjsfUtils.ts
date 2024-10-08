/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import pkg, { ErrorSchema, RJSFSchema, RJSFValidationError, ValidatorType } from '@rjsf/utils';
import BaseJsonUtil from './baseJsonUtil';

const { retrieveSchema } = pkg;

class RjsfJsonUtil extends BaseJsonUtil {
  get validator(): ValidatorType {
    return {
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
  }

  get referenceSchemas(): { [key: string]: RJSFSchema } {
    return {
      // "schemaId": JSON.parse(fs.readFileSync('path/to/referenced/schema.json', 'utf-8')),
    };
  }

  resolveRefs(json: object) {
    return retrieveSchema(this.validator, json, this.referenceSchemas);
  }
}

export default RjsfJsonUtil;
