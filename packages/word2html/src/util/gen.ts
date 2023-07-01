import path from 'path';
import { __src_path__, createTemplate, fsReadFile, fsWriteFile } from './index.js';

const COMMON_CSS = path.resolve(__src_path__, './assets/common.css');
const COMMON_JS = path.resolve(__src_path__, './assets/common.js');
const HTML_TEMPLATE_PATH = path.resolve(__src_path__, './template/template.html');

const VUE_TEMPLATE_PATH = path.resolve(__src_path__, './template/template.vue');
const REACT_TEMPLATE_PATH = path.resolve(__src_path__, './template/template.jsx');

export async function genHtml(name: string, content: string, dir: string) {
  const cssContent = await fsReadFile(COMMON_CSS);
  const jsContent = await fsReadFile(COMMON_JS);
  const HTML_TEMPLATE = (await fsReadFile(HTML_TEMPLATE_PATH)) as string;

  const html = createTemplate(HTML_TEMPLATE, {
    TEMPLATE_TITLE: name,
    TEMPLATE_CONTENT: content,
    '/* TEMPLATE_CSS */': cssContent,
    '// TEMPLATE_JS': jsContent
  });

  await fsWriteFile(`${dir}/${name}.html`, html, true);

  console.log(`-- ${name}.html 生成完毕 --`);
}

export async function genVue(name: string, content: string, dir: string) {
  const VUE_TEMPLATE = (await fsReadFile(VUE_TEMPLATE_PATH)) as string;
  const cssContent = await fsReadFile(COMMON_CSS);

  const html = createTemplate(VUE_TEMPLATE, {
    TEMPLATE_CONTENT: content,
    '/* TEMPLATE_CSS */': cssContent,
  });

  await fsWriteFile(`${dir}/${name}.vue`, html, true, 'vue');

  console.log(`-- ${name}.vue 生成完毕 --`);
}

export async function genReact(name: string, content: string, dir: string) {
  const REACT_TEMPLATE = (await fsReadFile(REACT_TEMPLATE_PATH)) as string;

  const html = createTemplate(REACT_TEMPLATE, {
    '// TEMPLATE_JS': `return <div>${content}</div>`
  });

  await fsWriteFile(`${dir}/${name}.jsx`, html, true, 'babel');

  console.log(`-- ${name}.jsx 生成完毕 --`);
}
