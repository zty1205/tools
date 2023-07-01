export type ZAnyObject = Record<string, any>;

export type RunOptions = {
  debugger?: boolean;
  clear?: boolean;
};

export type ZMammothParagraphElement = {
  type: string;
  children: ZMammothRunElement[];
  styleId?: any;
  styleName?: any;
  alignment?: any;
  numbering: null | ZMammothParagraphNumbering; // 是有序列表还是无序列表
  indent: null | ZMammothParagraphIndent; // 缩进出来
};

export type ZMammothParagraphNumbering = {
  isOrdered: boolean;
  level: string;
  paragraphStyleId: string // 字符串形式的数字
};

export type ZMammothParagraphIndent = {
  start?: any;
  end?: any;
  firstLine?: any;
  hanging?: any;
};

export type ZMammothRunElement = {
  type: string;
  children: ZMammothRunChild[];
  styleId?: any;
  styleName?: any;
  isBold: boolean;
  isUnderline: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isAllCaps: boolean;
  isSmallCaps: boolean;
  verticalAlignment: string;
  font?: any;
  fontSize?: any;
};

export type ZMammothRunChild =
  | ZMammothTextElement
  | ZMammothImageElement
  | ZMammothBookmarkStartElement
  | ZMammothBookmarkTabElement
  | ZMammothLinkElement;

export type ZMammothTextElement = {
  type: 'text';
  value: string;
};

export type ZMammothImageElement = {
  type: 'image';
  contentType: string;
};

export type ZMammothBookmarkStartElement = {
  type: 'bookmarkStart';
  name: string;
};

export type ZMammothBookmarkTabElement = {
  type: 'tab';
};

export type ZMammothLinkElement = {
  type: 'hyperlink';
  children: ZMammothTextElement[];
  href: string;
};
