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

export const getKeyboardFocusableElements = (element: any) => [
  ...element.querySelectorAll(
    ('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'),
  ),
];

export const trapFocusInsideModalWindow = () => {
  const modal = document.getElementById('modal');

  const focusableElementsInModal = getKeyboardFocusableElements(modal);
  const firstTabStop = focusableElementsInModal[0];
  const lastTabStop = focusableElementsInModal[focusableElementsInModal.length - 1];
  firstTabStop.focus();

  const trapTabKey = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      if (evt.shiftKey) {
        if (document.activeElement === firstTabStop) {
          evt.preventDefault();
          lastTabStop.focus();
        }

      } else {
        if (document.activeElement === lastTabStop) {
          evt.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  };

  modal?.addEventListener('keydown', trapTabKey);
  return () => modal?.removeEventListener('keydown', trapTabKey);
};

/**
 * Generic typed comparison fn for use with `Array.sort`
 * This is passed as the comparison function with
 * the following syntax:
 * MyArray.sort(compareObjectsByKey<MyObjectType>('myObjectKey', true/false)`
 * @type T
 * @param key: keyof T
 * @param ascending: boolean
 */
export function compareObjectsByKey<T>(key: keyof T, ascending = true) {
  return function innerSort(objectA: T, objectB: T) {
    let sortValue;
    if (objectA[key] > objectB[key]) {
      sortValue = 1;
    } else if (objectA[key] < objectB[key]) {
      sortValue = -1;
    } else {
      sortValue = 0;
    }
    console.log(sortValue);

    return ascending ? sortValue : -1 * sortValue;
  };
}
