/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';
import { useForm } from './use-form';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

interface TestData {
  userName: string;
  bool: boolean;
  num: number;
}

describe('useForm', () => {
  const getFakeTestEvent = (value: any = '') =>
    (({
      preventDefault: jest.fn(),
      target: { value },
    } as unknown) as ChangeEvent<any>);

  describe('smoke test', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });
  });

  describe('updating', () => {
    it('should update the data', () => {
      const { result } = renderHook(() => useForm<TestData>());
      expect(result.current.data.userName).toBeUndefined();
      act(() => {
        result.current.handleChange('userName')(getFakeTestEvent('test'));
      });

      expect(result.current.data.userName).toBe('test');
    });

    it('should initialize the data', () => {
      const { result } = renderHook(() =>
        useForm<TestData>({
          initialValues: {
            userName: 'John',
          },
        }),
      );

      expect(result.current.data.userName).toBe('John');
      expect(result.current.data.bool).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should call the onSubmit callback when there are no errors', () => {
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm<TestData>({
          onSubmit,
        }),
      );
      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should validate required values', () => {
      const requiredMessage = 'Заполните поле';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm<TestData>({
          validations: {
            userName: {
              required: {
                value: true,
                message: requiredMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.userName).toBe(requiredMessage);
    });

    it('should validate custom validations', () => {
      const validationMessage = 'Заполните поле';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm<TestData>({
          validations: {
            userName: {
              custom: {
                isValid: (value) => value !== undefined,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.userName).toBe(validationMessage);
    });

    it('should validate multiple validations', () => {
      const validationMessage = 'Заполните поле';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm<TestData>({
          validations: {
            userName: {
              pattern: {
                value: '/[A-Za-z]*/',
                message: validationMessage,
              },
              custom: {
                isValid: (value) => value !== undefined,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it('should reset errors on submit', () => {
      const validationMessage = 'Заполните поле';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm<TestData>({
          validations: {
            userName: {
              required: {
                value: false,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        }),
      );

      onSubmit.mockReset();
      act(() => {
        result.current.handleChange('userName')(getFakeTestEvent());
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(result.current.errors.userName).toBeUndefined();

      act(() => {
        result.current.handleChange('userName')(getFakeTestEvent('Anna'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(result.current.errors.userName).toBeUndefined();
    });
  });
});
