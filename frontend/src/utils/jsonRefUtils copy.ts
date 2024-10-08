// /* eslint-disable no-restricted-syntax */
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
// import { promisify } from 'util';
// import { finished } from 'stream';
// import { MOAPY_PYPI_URL, SCHEMAS, MANAGED } from 'src/utils/constants';
// import * as fs from 'fs-extra';
// import * as tar from 'tar';
// import * as path from 'path';
// import { FileValidator } from './file.validator';
// import * as exception from '../../common/exception';

// const fileValidator = new FileValidator();
// const httpService = new HttpService();

// export const downloadFile = async (url: string, filePath: string): Promise<void> => {
//   fileValidator.validateFilePath(url, filePath);
//   try {
//     const response = await firstValueFrom(httpService.get(url, { responseType: 'stream' }));
//     const writer = fs.createWriteStream(filePath);
//     response.data.pipe(writer);
//     await promisify(finished)(writer);
//   } catch (error) {
//     throw exception.createException(exception.UN_PROCESSABLE_ENTITY_DOWNLOAD, error.message);
//   }
// };

// export const extractTarFile = async (filePath: string, outDirPath: string): Promise<void> => {
//   fileValidator.validateFilePath(filePath, outDirPath);
//   try {
//     await tar.x({ file: filePath, cwd: outDirPath, strip: 1 });
//     await fs.remove(filePath);
//   } catch (error) {
//     throw exception.createException(exception.UN_PROCESSABLE_ENTITY_UNZIP, error.message);
//   }
// };

// export const checkAndUpdateFunctionVersion = async (): Promise<string> => {
//   const response = await firstValueFrom(httpService.get(MOAPY_PYPI_URL));
//   const latestVersion = Object.keys(response.data.releases).pop();
//   const versionDirPath = `${SCHEMAS}/${latestVersion}`;

//   if (await fs.pathExists(versionDirPath)) {
//     return versionDirPath;
//   }

//   const latestFile = response.data.releases[latestVersion][1];
//   const filePath = `${SCHEMAS}/${latestVersion}/${latestFile.filename}`;

//   await fs.ensureDir(versionDirPath);
//   await downloadFile(latestFile.url, filePath);
//   await extractTarFile(filePath, versionDirPath);
//   return versionDirPath;
// };

// const extractFunctionId = (filePath: string): string | null => {
//   const regex = /managed[\\/](.+?)\.json/;
//   const match = filePath.replace(/\\/g, '/').match(regex);
//   return match ? match[1] : null;
// };

// const getJsonFiles = async (dir: string, isExtractId: boolean): Promise<string[]> => {
//   const fileList = await fs.readdir(dir);
//   const allFilesPromises = fileList.map((file) => processFile(path.join(dir, file), isExtractId));
//   const results = await Promise.all(allFilesPromises);
//   return results.flat();
// };

// const processFile = async (filePath: string, isExtractId: boolean): Promise<string[]> => {
//   const stat = await fs.stat(filePath);
//   if (stat.isDirectory()) {
//     return getJsonFiles(filePath, isExtractId);
//   }
//   if (isValidJsonFile(filePath)) {
//     return [await handleJsonFile(filePath, isExtractId)].filter(Boolean);
//   }
//   return [];
// };

// const isValidJsonFile = (filePath: string): boolean => filePath.endsWith('.json') && filePath.includes(MANAGED);

// const handleJsonFile = async (filePath: string, isExtractId: boolean): Promise<string> => {
//   if (isExtractId) {
//     const match = extractFunctionId(filePath);
//     return match || '';
//   }
//   return getManagedJsonFileByPath(filePath);
// };

// export const getManagedJsonFunctionList = async (dir: string): Promise<string[]> => {
//   const isExtractId = true;
//   return getJsonFiles(dir, isExtractId);
// };

// export const getManagedJsonFiles = async (dir: string): Promise<string[]> => {
//   const isExtractId = false;
//   return getJsonFiles(dir, isExtractId);
// };

// export const getManagedJsonFileById = async (dir: string, functionId: string): Promise<string> => {
//   const filePath = `${dir}/${SCHEMAS}/${MANAGED}/${functionId}.json`;
//   return getManagedJsonFileByPath(filePath);
// };

// const getManagedJsonFileByPath = async (filePath: string): Promise<string> => {
//   const file = await fs.readFile(filePath, 'utf8');
//   const mappedJson = resolveReferences(JSON.parse(file));
//   return mappedJson;
// };

// const resolveReferences = (json: object): any => {
//   const resolveRef = (ref: string, root: object): object => {
//     const parts = ref.split('/').slice(1);
//     let result = root;
//     for (const part of parts) {
//       if (result && part in result) {
//         result = result[part];
//       } else {
//         throw exception.createException(exception.UN_PROCESSABLE_ENTITY_JSON);
//       }
//     }
//     return result;
//   };

//   const resolveObject = (obj: any, root: object): any => {
//     if (Array.isArray(obj)) {
//       return obj.map((item) => resolveObject(item, root));
//     }
//     if (obj !== null && typeof obj === 'object') {
//       if (obj.$ref) {
//         return resolveObject(resolveRef(obj.$ref, root), root);
//       }
//       return Object.keys(obj).reduce((acc, key) => {
//         acc[key] = resolveObject(obj[key], root);
//         return acc;
//       }, {} as object);
//     }
//     return obj;
//   };

//   return resolveObject(json, json);
// };
