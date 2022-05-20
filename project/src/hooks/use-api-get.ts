/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAppDispatch } from '.';

export type TApiResponse = {
  loading: boolean;
};

export const useApiGet = (arg: any, fetchFunc: any): TApiResponse => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFunc(arg))
        .then(() => {
          setLoading(true);
        });
    };

    fetchData();
    setLoading(false);
  }, []);

  return { loading };
};
