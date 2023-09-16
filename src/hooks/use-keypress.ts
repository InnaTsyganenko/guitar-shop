/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key: string, action: VoidFunction) {
  useEffect(() => {
    const onKeyup = (evt: KeyboardEvent) => {
      if (evt.key === key) {
        action();
      }
    };
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
}
