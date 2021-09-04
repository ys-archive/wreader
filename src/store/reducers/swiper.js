import { action, computed } from 'easy-peasy';
import { Coordinates } from './swiper.coords';

export default {
  categoryIdx: 0,
  depth: 0,
  coords: new Coordinates(0, 0, 0),
};

export const selectors = {
  categoryIdx: state => state.swiper.categoryIdx,
  depth: state => state.swiper.depth,
  coords: state => state.swiper.coords,
};

export const actions = {};
