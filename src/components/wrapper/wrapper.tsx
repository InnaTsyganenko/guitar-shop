import { PropsWithChildren, ReactNode } from 'react';

type WrapperProps = PropsWithChildren<{
  children?: ReactNode;
}>;

function Wrapper({children = ''}: WrapperProps): JSX.Element {
  return (<div className="wrapper" data-testid="wrapper">{children}</div>
  );
}

export default Wrapper;
