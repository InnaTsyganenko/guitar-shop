import { useEffect, useState } from 'react';
import { throttle } from '../utils/utils';

export default function useScrollControl() {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalHandler = () => setModalOpen(!isModalOpen);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isModalOpen) {
      throttle(document.body.style.overflow = 'hidden', 350);
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isModalOpen]);

  return { isModalOpen, modalHandler };
}
