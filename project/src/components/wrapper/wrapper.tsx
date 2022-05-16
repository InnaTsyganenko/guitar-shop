import { PropsWithChildren, ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import { getStatusModalWindow } from '../../store/guitars-operations/selectors';

type WrapperProps = PropsWithChildren<{
  children?: ReactNode;
}>;

function Wrapper({children = ''}: WrapperProps): JSX.Element {

  const statusModalWindow = useAppSelector(getStatusModalWindow);

  return (
    <div className={statusModalWindow ? 'wrapper' : 'wrapper wrapper--no-scrollbar'} data-testid="wrapper">
      {children}
    </div>
  );
}

export default Wrapper;
