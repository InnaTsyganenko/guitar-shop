import { PropsWithChildren, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { setModalWindowState } from '../../store/guitars-operations/guitars-operations';
import { trapFocusInsideModalWindow } from '../../utils/utils';
import useKeypress from '../../hooks/use-keypress';
import useScrollControl from '../../hooks/use-scroll-control';

type ModalOverlayProps = PropsWithChildren<{
  onModalCloseClick: () => void;
  children?: JSX.Element
}>;

function ModalOverlay({onModalCloseClick, children}: ModalOverlayProps): JSX.Element {
  const { modalHandler } = useScrollControl();
  const dispatch = useAppDispatch();

  const handleModalClose = useCallback(() => {
    onModalCloseClick();
    dispatch(setModalWindowState(false));
  }, [onModalCloseClick, dispatch]);

  useKeypress('Escape', () => {
    handleModalClose();
  });

  useEffect(() => {
    if (children !== undefined) {
      modalHandler();
      trapFocusInsideModalWindow(children?.props.id);
    }
  });

  return (
    <div data-testid="modal-overlay" className={(children?.props.id === 'modal-success-review' || children?.props.id === 'modal-success-add')
      ? 'modal is-active modal--success modal-for-ui-kit'
      : 'modal is-active modal-for-ui-kit'}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid="close-modal" onClick={handleModalClose} />
        {children}
      </div>
    </div>);
}

export default ModalOverlay;
