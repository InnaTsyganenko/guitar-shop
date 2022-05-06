import { STEP_ONE, COUNT_RATING_STARS } from './const';

export const countFullStars = (rating: number) => {
  const arrayFullStars = [];
  while (arrayFullStars.length < Math.round(rating)) {
    arrayFullStars.push(arrayFullStars.length + STEP_ONE);
  }

  return arrayFullStars;
};

export const countEmptyStars = (rating: number) => {
  const arrayEmptyStars = [];
  while (arrayEmptyStars.length < (COUNT_RATING_STARS - Math.round(rating))) {
    arrayEmptyStars.push(arrayEmptyStars.length + STEP_ONE);
  }

  return arrayEmptyStars;
};

export function throttle(callee: any, timeout: number) {
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
