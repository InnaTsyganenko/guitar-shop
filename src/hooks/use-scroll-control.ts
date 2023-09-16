import { useEffect, useState } from 'react';

export default function useScrollControl() {
  const [isModalOpen, setModalOpen] = useState(false);

  const modalHandler = () => setModalOpen(!isModalOpen);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isModalOpen]);

  return { isModalOpen, modalHandler };
}
