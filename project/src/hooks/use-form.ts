import { KeyboardEvent } from 'react';
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Validations, ErrorRecord } from '../types/state';

export const useForm = <T extends Record<keyof T, any> = Record<string, any>>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S,
  ) => (evt: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      const value = sanitizeFn ? sanitizeFn(evt.target.value) : evt.target.value;
      setData({
        ...data,
        [key]: value,
      });
    };

  const handlePaste = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S,
  ) => (evt: any) => {
      const paste: any = (evt.clipboardData)?.getData('text');
      const newPaste = Array.from(paste).filter((item) => item !== ' ');
      // evt.target.value = newPaste.map((item) => item).join('');
      const value = newPaste.map((item) => item).join('');
      setData({
        ...data,
        [key]: value,
      });
      evt.preventDefault();
    };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handlePaste,
    handleSubmit,
    errors,
  };
};
