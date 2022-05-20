import { PropsWithChildren } from 'react';
import Wrapper from '../wrapper/wrapper';

type LoadingScreenProps = PropsWithChildren<{
  text: string;
}>;

function LoadingScreen({text}: LoadingScreenProps) {
  return (
    <Wrapper>
      <main className="page-content">
        <div className="container">
          <h2>{text}</h2>
        </div>
      </main>
    </Wrapper>
  );
}

export default LoadingScreen;
