import { PropsWithChildren, ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { getStatusModalWindow } from '../../store/guitars-operations/selectors';

type WrapperProps = PropsWithChildren<{
  children?: ReactNode;
}>;

function Wrapper({children = ''}: WrapperProps): JSX.Element {

  const isModalWindowOpen = useAppSelector(getStatusModalWindow);

  return (
    <div className={isModalWindowOpen ? 'wrapper wrapper--no-scrollbar' : 'wrapper'} data-testid="wrapper">
      {children}
    </div>
  );
}

export default Wrapper;
