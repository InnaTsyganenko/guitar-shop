import { PropsWithChildren, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';
import { trapFocusInsideModalWindow } from '../../utils/utils';
import useKeypress from '../../hooks/use-keypress';

type ModalOverlayProps = PropsWithChildren<{
  onModalCloseClick: () => void;
}>;

function ModalOverlay({onModalCloseClick}: ModalOverlayProps): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    trapFocusInsideModalWindow();
  },[]);

  const handleModalClose = useCallback(() => {
    onModalCloseClick();
    dispatch(setModalWindowState(false));
  }, [onModalCloseClick, dispatch]);

  useKeypress('Escape', () => {
    handleModalClose();
  });


  return <div className="modal__overlay" data-testid="close-modal" onClick={handleModalClose} />;
}

export default ModalOverlay;
