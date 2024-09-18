/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { BaseFlowTask } from './base-flow-task';
import { Flow } from './flow';

type ParamType = number | string | boolean | null | undefined;

type ParamInfo = {
  name: string;
  type: ParamType;
};

type FunctionInfo = {
  functionName: string;
  inputParams: ParamInfo[];
  outputParam: ParamInfo;
};

function parseFunctionInfo(functionString: string): FunctionInfo {
  // 정규 표현식을 사용하여 함수 이름, 입력 매개변수, 반환 타입을 추출합니다.
  const regex = /function\s+(\w+)\s*\((.*?)\)\s*:\s*(\w+)/;
  const match = functionString.match(regex);

  if (!match) {
    throw new Error('Invalid function string format');
  }

  const [, functionName, paramsString, returnType] = match;

  // 입력 매개변수 파싱
  const inputParams: ParamInfo[] = paramsString.split(',').map((param) => {
    const [name, type] = param
      .trim()
      .split(':')
      .map((s) => s.trim());
    return { name, type };
  });

  // 함수 정보 객체 생성 및 반환
  return {
    functionName,
    inputParams,
    outputParam: { name: 'output', type: returnType },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function createExecutableFunction(functionString: string): Function {
  // 함수 본문 추출
  const bodyMatch = functionString.match(/{([\s\S]*)}/);
  if (!bodyMatch) {
    throw new Error('Cannot extract function body');
  }
  const functionBody = bodyMatch[1];

  // 매개변수 이름 추출
  const paramsMatch = functionString.match(/\((.*?)\)/);
  if (!paramsMatch) {
    throw new Error('Cannot extract function parameters');
  }
  const params = paramsMatch[1].split(',').map((param) => param.split(':')[0].trim());

  // 새로운 함수 생성 및 반환
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(...params, functionBody);
}

export class TsFnFlowTaskV2 extends BaseFlowTask {
  private readonly functionString: string;

  private readonly functionInfo: FunctionInfo;

  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly executableFunction: Function;

  private inputs: {
    [K in FunctionInfo['inputParams'][number]['name']]: FunctionInfo['inputParams'][number]['type'] | null;
  } = {};

  private output: FunctionInfo['outputParam']['type'] | null = null;
  // private inputs: Record<string, any> = {};

  // private output: FunctionInfo['outputParam']['type'] | null = null;

  constructor(taskId: string, functionStr: string, flow: Flow) {
    super(taskId, flow);
    this.functionString = functionStr;
    this.functionInfo = parseFunctionInfo(this.functionString);
    this.executableFunction = createExecutableFunction(this.functionString);
    this.functionInfo.inputParams.forEach((param) => {
      this.setInput(param.name, null);
    });
  }

  override async run() {
    console.log(`Running task ${this.taskId}`);
    const inputValues = this.functionInfo.inputParams.map((param) => this.inputs[param.name]);
    const res = await this.executableFunction(...inputValues);
    this.output = res;
  }

  getOutput(): FunctionInfo['outputParam']['type'] | null {
    return this.output;
  }

  setInput(
    name: FunctionInfo['inputParams'][number]['name'],
    value: FunctionInfo['inputParams'][number]['type'] | null,
  ) {
    this.inputs[name] = value;
  }

  get id() {
    return this.taskId;
  }

  get functionName() {
    return this.functionInfo.functionName;
  }

  getFunctionString() {
    return this.functionString;
  }

  get inputParams() {
    return this.functionInfo.inputParams;
  }

  get outputParam() {
    return this.functionInfo.outputParam;
  }
}
