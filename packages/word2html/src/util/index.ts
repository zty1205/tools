import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { ZAnyObject } from '../types';

export const __src_path__ = path.resolve('', './src');

export function fsReadFile(path: string): Promise<string | undefined> {
  return new Promise((resolve) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        resolve(undefined);
      } else {
        resolve(data);
      }
    });
  });
}

function _fsWriteFile(path: string, content: string): Promise<void> {
  return new Promise((resolve) => {
    fs.writeFile(path, content, { encoding: 'utf-8' }, () => {
      resolve(undefined);
    });
  });
}

export function fsWriteFile(path: string, content: string, format = false, parser = 'html') {
  if (format) {
    content = prettier.format(content, { semi: true, parser });
  }
  return _fsWriteFile(path, content);
}

export function getFileName(pathname: string) {
  return path.basename(pathname, path.extname(pathname));
}

export function createTemplate(template: string, options: ZAnyObject) {
  for (let k in options) {
    template = template.replace(k, options[k]);
  }
  return template;
}

export function deleteFolderFile(folderPath: string) {
  //判断文件夹是否存在
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (!fs.lstatSync(curPath).isDirectory()) {
        fs.unlinkSync(curPath);
      }
    });
  }
}


export function toRomanNumber(num: number): string {
  let numArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let RomaArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  let index = 0
  let res = ''
  while (index < 13) {
      while (num >= numArr[index]) {
          res += RomaArr[index]
          num -= numArr[index]
      }
      index++
  }
  return res
}