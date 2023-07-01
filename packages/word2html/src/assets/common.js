let viewport = document.querySelector('meta[name=viewport]');
let dpr = window.devicepixelRatio || 1;
let scale = 1 / dpr;
let designWidth = 375;
viewport.setAttribute(
  'content',
  `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no, viewport-fit=cover`,
);
let width = document.documentElement.clientWidth;
let rate = width / designWidth;
document.getElementsByTagName('html')[0].style.setProperty('font-size', 100 * rate + 'px');
document.getElementsByTagName('html')[0].style.setProperty('overflow', 'visible');