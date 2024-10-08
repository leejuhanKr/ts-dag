/* eslint-disable max-classes-per-file */
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import createJsonUtilFactory from './createJsonUtilFactory';

const TEMP_DIR = '/Users/juhan/Workspace/dag/frontend/src/utils/jsonUtils';

const getJson = (path: string): string => {
  // path가 존재하지 않으면 에러 발생
  if (!path) {
    throw new Error('Path is required');
  }
  if (!path.endsWith('.json')) {
    throw new Error('Only JSON files are supported');
  }
  // const fullPath = join(TEMP_DIR, path);
  if (!existsSync(path)) {
    throw new Error(`File not found: ${path}`);
  }
  return readFileSync(path, 'utf-8');
};

const saveJson = (json: any, path: string): void => {
  // path가 존재하지 않으면 에러 발생
  if (!path) {
    throw new Error('Path is required');
  }
  if (!path.endsWith('.json')) {
    throw new Error('Only JSON files are supported');
  }
  const fullPath = join(TEMP_DIR, path);
  writeFileSync(fullPath, JSON.stringify(json, null, 2), 'utf-8');
};

const jsonUtil = createJsonUtilFactory('rjsf');

const main = () => {
  const jsonFilePath = join(TEMP_DIR, './data/data.json');
  const jsonStringData = getJson(jsonFilePath);
  const jsonObj = jsonUtil.parse(jsonStringData);
  console.log(jsonObj);
  const jsonObjResolvedRef = jsonUtil.resolveRefs(jsonObj);
  console.log(jsonObjResolvedRef);
  saveJson(jsonObjResolvedRef, './data/generated.json');
  // const jsonUtil = createJsonUtilFactory("ajv");
  // const jsonUtil = createJsonUtilFactory("rjsf");
};

main();
console.log('Hello, World!');
