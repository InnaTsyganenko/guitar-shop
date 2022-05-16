import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../hooks';
import { getStatusModalWindow } from '../../store/guitars-operations/selectors';

type WrapperProps = PropsWithChildren<{
  children: JSX.Element|JSX.Element[];
}>;

function Wrapper(props: WrapperProps): JSX.Element {

  const statusModalWindow = useAppSelector(getStatusModalWindow);

  return (
    <div className={statusModalWindow ? 'wrapper' : 'wrapper wrapper--no-scrollbar'} data-testid="wrapper">
      {props.children}
    </div>
  );
}

Wrapper.defaultProps = {
  children: '',
};

export default Wrapper;
