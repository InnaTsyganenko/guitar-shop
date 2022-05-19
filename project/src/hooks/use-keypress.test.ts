/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { useKeypress } from './use-keypress';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

interface TestData {
  userName: string;
  bool: boolean;
  num: number;
}

describe('useKeyPress', () => {
  const getFakeTestEvent = (value: any = '') =>
    (({
      preventDefault: jest.fn(),
      target: { value },
    } as unknown) as ChangeEvent<any>);

  describe('smoke test', () => {
    it('should be a function', () => {
      expect(typeof useKeypress).toBe('function');
    });
  });
});
