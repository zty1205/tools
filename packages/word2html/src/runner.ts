import { ZMammothParagraphElement } from '@/types';
import { createEmpty, createHyperlink, createText } from './util/create.js';
import { toRomanNumber } from './util/index.js';

let paragraphStyleId = 1;

export default function runner(element: ZMammothParagraphElement) {
  /** 下面的逻辑是根据具体的html进行微调 */

  if (
    element.children.length &&
    element.children[0].children &&
    element.children[0].children[0] &&
    element.children[0].children[0].type === 'image'
  ) {
    element.children = [];
  }

  if (element.children.length && element.children.every((x) => x.fontSize === 14)) {
    element.styleName = 'Title';
    const text = element.children
      .map((x) => (x.children[0] && 'value' in x.children[0] ? x.children[0].value : ''))
      .join('');
    element.children = [
      {
        ...element.children[0],
        isBold: false,
        children: [{ type: 'text', value: text }]
      }
    ];
  }

  if (element.styleName === 'heading 1') {
    element.styleName = 'heading 4';
  }

  if (element.numbering) {
    if (element.numbering.level === '1') {
      element.numbering.level = '0';
    }

    if (element.numbering?.paragraphStyleId) {
      if (element.children[0].children[0].type === 'text') {
        element.children[0].children[0].value =
          `${toRomanNumber(Number(paragraphStyleId++))}. ` + element.children[0].children[0].value;
      }
    }
    if (element.numbering.isOrdered) {
      element.numbering = null;
    }
  }

  if (element.children[0] && element.children[0].children[0]) {
    const runChild = element.children[0].children[0];
    if (runChild.type === 'text' && runChild.value.indexOf('https://')) {
      const mt = runChild.value.match(/https:\/\/(.)+/);
      if (mt && mt[0]) {
        const link = mt[0].trim();
        const text = runChild.value.replace(link, '').trim();
        element.children = [createText(`${text} `), createEmpty(), createHyperlink(link)];
      }
    }
  }
}
