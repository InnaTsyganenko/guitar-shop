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

export const trapFocusInsideModalWindow = (id: string) => {
  const modal = document.getElementById(id);

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

export const removeMatchItemsFromArray = (arrayOne: any, arrayTwo: any): Array<any> => {
  arrayTwo.forEach((i: any) => {
    const index = arrayOne.lastIndexOf(i);
    if (index > -1) {
      arrayOne.splice(index, 1);
    }
  });

  return arrayOne;
};
