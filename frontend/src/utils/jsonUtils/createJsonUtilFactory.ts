import BaseJsonUtil from './baseJsonUtil';
import CustomJsonUtil from './customJsonUtil';
import RjsfJsonUtil from './rjsfUtils';

class CreateJsonUtilFactory {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  create(): BaseJsonUtil {
    switch (this.type) {
      case 'custom':
        return new CustomJsonUtil();
      case 'rjsf':
        return new RjsfJsonUtil();
      default:
        throw new Error('Unsupported type');
    }
  }

  static create(type: string): BaseJsonUtil {
    const createJsonUtilFactory = new CreateJsonUtilFactory(type);
    return createJsonUtilFactory.create();
  }
}

const createJsonUtilFactory = (type: string): BaseJsonUtil => CreateJsonUtilFactory.create(type);
export default createJsonUtilFactory;
