import { PropsWithChildren, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';

type ModalCloseButtonProps = PropsWithChildren<{
  onModalCloseClick: () => void;
}>;

function ModalCloseButton({onModalCloseClick}: ModalCloseButtonProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    onModalCloseClick();
    dispatch(setModalWindowState(false));
  }, [onModalCloseClick, dispatch]);


  return (
    <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
      onClick={handleModalClose}
    ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
    </button>
  );
}

export default ModalCloseButton;
