import { ZMammothRunElement } from '@/types';

export function createHyperlink(link: string): ZMammothRunElement {
  return {
    type: 'run',
    children: [
      {
        type: 'hyperlink',
        children: [
          {
            type: 'text',
            value: link
          }
        ],
        href: link
      }
    ],
    styleId: '5',
    styleName: 'Hyperlink',
    isBold: false,
    isUnderline: false,
    isItalic: false,
    isStrikethrough: false,
    isAllCaps: false,
    isSmallCaps: false,
    verticalAlignment: 'baseline',
    font: null,
    fontSize: null
  };
}

export function createText(text: string): ZMammothRunElement {
  return {
    type: 'run',
    children: [
      {
        type: 'text',
        value: text
      }
    ],
    styleId: null,
    styleName: null,
    isBold: false,
    isUnderline: false,
    isItalic: false,
    isStrikethrough: false,
    isAllCaps: false,
    isSmallCaps: false,
    verticalAlignment: 'baseline',
    font: null,
    fontSize: null
  };
}

export function createEmpty(): ZMammothRunElement {
  return {
    type: 'run',
    children: [],
    styleId: null,
    styleName: null,
    isBold: false,
    isUnderline: false,
    isItalic: false,
    isStrikethrough: false,
    isAllCaps: false,
    isSmallCaps: false,
    verticalAlignment: 'baseline',
    font: null,
    fontSize: null
  };
}