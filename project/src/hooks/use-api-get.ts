/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '.';

export type TApiResponse = {
  loading: boolean;
};

export const useApiGet = (arg: any, fetchFunc: any): TApiResponse => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchMyAPI = useCallback(async () => {
    await dispatch(fetchFunc({arg}))
      .then(() => {
        setLoading(true);
      });
  }, [dispatch, arg, fetchFunc]);

  useEffect(() => {
    fetchMyAPI();
    setLoading(false);
  }, [fetchMyAPI]);

  return { loading };
};
