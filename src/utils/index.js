import { asyncForEach } from './async';
import { delay, delayFinally, tick } from './time';
import {
  isTypeOf,
  isTypeOfExcept,
  isArrayTypeof,
  isArrayTypeofExcept,
} from './type';
import {
  getResolutionByPixelRatio,
  getImagePathByScreenResolution,
  getImageExtension,
  findImageInCache,
  cacheImage,
} from './image';

export {
  asyncForEach,
  delay,
  delayFinally,
  tick,
  isTypeOf,
  isTypeOfExcept,
  isArrayTypeof,
  isArrayTypeofExcept,
  getResolutionByPixelRatio,
  getImagePathByScreenResolution,
  getImageExtension,
  findImageInCache,
  cacheImage,
};
