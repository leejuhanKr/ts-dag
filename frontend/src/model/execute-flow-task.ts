import { getDefaultFormState } from '@rjsf/utils';
import { FlowSchema as FlowSchema } from '../types';
import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow';
import path from 'path';

export class ExecuteFlowTask extends BaseFlowTask {
  private readonly executeURI: string;
  private readonly flowSchema: FlowSchema;

  constructor(taskId: string, executeURI: string, flowSchema: FlowSchema, flow: Flow) {
    super(taskId, flow);
    this.executeURI = executeURI;
    this.flowSchema = flowSchema;
  }

  override async run() {
    console.log(`Running task ${this.taskId}`);
    const defaultParam = getDefaultParamFromSchema(this.flowSchema);
    // console.log(defaultParam)
    // -----
    const context = this.flow.getContext();
    const upstreamIds = [...this.upstreamList].map((node) => node.taskId);
    // console.log(upstreamIds)
    const param = upstreamIds
      .map((upstreamId) => context.get(upstreamId))
      .reduce((acc, cur) => mergeParam(acc, cur), defaultParam);
    // console.log(param)

    const functionInputParam = exParam2FnParam(param);

    const res = await executeNetworkFunc(this.executeURI, functionInputParam);

    context.set(this.taskId, res.json);

    // context.set(this.taskId, {
    // 	'moapy.data_pre.clac3pdm!!': { concrete: [Object], rebar: [Object], tendon: [Object] }
    // });
  }
}

type Param = Record<string, any>;
// const BASE_FUNCTION_EXECUTE_URL = `https://moa.rpm.kr-dv-midasit.com/backend/function-executor/python-execute`

// export const getFunctionExecuteUrl = (functionPath: string): string => {
// 	const url = path.join(BASE_FUNCTION_EXECUTE_URL, functionPath)
// 	return url
// }

export const findPropertySchema = (schema: FlowSchema, key: string) => {
  const [_, propSchema] = Object.entries(schema.properties).find(([_key, _]) => _key === key);
  return propSchema;
};

export const getDefaultParamFromSchema = (schema: FlowSchema) => {
  const params = schema.required.map((requiredParamKey) => {
    const propSchema = findPropertySchema(schema, requiredParamKey);
    const param = { [requiredParamKey]: getDefaultFormState(null, propSchema) };
    return [propSchema.dataclassname, param];
  });
  return Object.fromEntries(params);
};

export const exParam2FnParam = (input: Param) => {
  const res = Object.entries(input).map(([_ /*dataclassname*/, param]) => param);
  return Object.assign({}, ...res);
};

export const mergeParam = (defaultParam: Param, ...params: readonly Param[]) => {
  // console.log(params)
  return Object.assign({}, defaultParam, ...params);
};

export const executeNetworkFunc = async (functionPath: string, formData: any): Promise<any> => {
  const url = functionPath;
  console.log('url', url);
  console.log('formData', formData);
  const start = performance.now();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const end = performance.now();
  const executionTime = end - start;
  console.log('executionTime', executionTime);

  if (!response.ok) {
    throw new Error(`Failed to execute function: ${functionPath}`);
    // throw exception.createServiceException(exception.INTERNAL_SERVER_ERROR)
  }

  const res = await response.json();
  console.info(res);
  return res;
};
