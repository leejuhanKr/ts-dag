/* eslint-disable import/prefer-default-export */
type ParamInfo = {
  paramName: string;
  paramType: string;
};

type FunctionInfo = {
  params: ParamInfo[];
  returnType: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function analyzeTsArrowFunction<T extends (...args: any[]) => any>(func: T): FunctionInfo {
  const funcStr = func.toString();
  console.log(funcStr);
  const paramStr = funcStr.slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')'));
  const params = paramStr.split(',').map((param) => param.trim());

  const paramInfo: ParamInfo[] = params.map((param) => {
    const [paramName, paramType] = param.split(':').map((p) => p.trim());
    return {
      paramName,
      paramType: paramType || 'any',
    };
  });

  // 반환 타입 추출
  let returnType = 'any';
  const returnTypeMatch = funcStr.match(/\)\s*:\s*([^=>{]+)/);
  if (returnTypeMatch) {
    returnType = returnTypeMatch[1].trim();
  } else if (funcStr.includes('=>')) {
    const afterArrow = funcStr.split('=>')[1].trim();
    if (afterArrow.startsWith('{')) {
      // 함수 본문이 있는 경우, 반환 타입을 추론하기 어려움
      returnType = 'unknown';
    } else {
      // 단일 표현식인 경우, 해당 표현식의 타입으로 간주
      returnType = 'inferred';
    }
  }

  return {
    params: paramInfo,
    returnType,
  };
}
