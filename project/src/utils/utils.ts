/* eslint-disable @typescript-eslint/no-explicit-any */
import { STEP_ONE, TOTAL_RATING_UNITS } from '../const';

export const countFullStars = (rating: number) => {
  const arrayFullStars: number[] = [];
  while (arrayFullStars.length < Math.round(rating)) {
    arrayFullStars.push(arrayFullStars.length + STEP_ONE);
  }
  return arrayFullStars;
};

export const countEmptyStars = (rating: number) => {
  const arrayEmptyStars: number[] = [];
  while (arrayEmptyStars.length < (TOTAL_RATING_UNITS - Math.round(rating))) {
    arrayEmptyStars.push(arrayEmptyStars.length + STEP_ONE);
  }
  return arrayEmptyStars;
};

export function throttle(callee: any, timeout: any) {
  let timer: any = null;

  return function perform(...args: any) {
    if (timer) {return;}

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
