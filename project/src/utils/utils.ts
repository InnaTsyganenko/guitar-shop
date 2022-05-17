/* eslint-disable @typescript-eslint/no-explicit-any */
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
