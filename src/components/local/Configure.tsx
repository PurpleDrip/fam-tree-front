"use client"

import { checkForCookies } from '@/api/auth';
import { registered, setInitialState } from '@/redux/userSlice';
import ErrorResponse from '@/types/errorMsg';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import type { AxiosError} from 'axios';

const Configure = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCookies = async () => {
      try {
        const res = await checkForCookies();
        console.log(res)
        dispatch(setInitialState(res.data.data))
        dispatch(registered(true));
      } catch (e) {
        const err = (e as AxiosError<ErrorResponse>).response?.data?.message;
        console.log(err)
      }
    };
    checkCookies();
  }, [dispatch])

  return null;
}

export default Configure