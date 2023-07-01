import path from 'path';
import fs from 'fs';
import mammoth from 'mammoth';
import { __src_path__, deleteFolderFile, fsWriteFile, getFileName } from './util/index.js';
import { RunOptions, ZAnyObject, ZMammothParagraphElement } from './types';
import { genHtml } from './util/gen.js';
import runner from './runner.js';

const DIR = path.resolve(__src_path__, '../targets');
const DIST = path.resolve(__src_path__, '../dist');

const originElms: ZAnyObject[] = [];
const elms: ZAnyObject[] = [];

function transformParagraph(element: ZMammothParagraphElement, options: RunOptions) {
  if (options.debugger) {
    originElms.push(JSON.parse(JSON.stringify(element)));
  }

  runner(element);

  if (options.debugger) {
    elms.push(element);
  }

  return element;
}

function handleHtml(tem: string) {
  tem = tem.replace(/<p>\s*<\/p>/g, '');
  tem = tem.replace(/<strong>\s*<\/strong>/g, '');
  tem = tem.replace(/<p><strong>\s*<\/strong><\/p>/g, '');
  return tem;
}

async function step(fileName: string, options: RunOptions) {
  if (!/\.docx/.test(fileName)) return;

  console.log(`Step ${fileName} Word2html Start`);
  console.log('');

  const manOptions = {
    styleMap: [
      "p[style-name='Title'] => h1:fresh",
      "p[style-name='Section Title'] => h2:fresh",
      "p[style-name='heading 4'] => h4:fresh",
      "p[style-name='fresh'] => p:fresh"
    ],
    ignoreEmptyParagraphs: true,
    // @ts-ignore
    transformDocument: mammoth.transforms.paragraph((ele) => transformParagraph(ele, options))
  };

  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
  }
  if (options.clear) {
    deleteFolderFile(DIST);
  }

  console.log(`--- 开始解析 ${fileName} 文件 ---`);

  const result = await mammoth.convertToHtml(
    {
      path: `${DIR}/${fileName}`
    },
    manOptions
  );

  console.log('--- 解析完毕，开始生成模板 ---');

  const name = getFileName(fileName);
  const htmlContent = handleHtml(result.value);
  await Promise.all([genHtml].map((f) => f(name, htmlContent, DIST)));

  if (options.debugger) {
    console.log('---开始生成 JSON 文件 ---');
    fsWriteFile(`DIST/${name}.json`, JSON.stringify(elms), true, 'json');
    fsWriteFile(`DIST/${name}.origin.json`, JSON.stringify(originElms), true, 'json');
  }

  console.log('');
  console.log('Step Word2html End');
  console.log('');
}

function main(options: RunOptions) {
  const files = fs.readdirSync(DIR) || [];
  for (let i = 0; i < files.length; i++) {
    step(files[i], options);
  }
}

main({ debugger: true, clear: true });
