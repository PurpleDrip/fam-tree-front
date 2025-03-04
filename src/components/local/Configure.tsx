"use client"

import { checkForCookies } from '@/api/auth';
import { addTree, registered } from '@/redux/userSlice';
import ErrorResponse from '@/types/errorMsg';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import type { AxiosError, AxiosResponse } from 'axios';
import { ITree } from '@/types/tree';


const Configure = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCookies = async () => {
      try {
        const res = await checkForCookies();
        const tree = res.data.data;
        console.log(tree)
        dispatch(registered(true));
        dispatch(addTree(tree))
      } catch (e) {
        const err = (e as AxiosError<ErrorResponse>).response?.data?.message;
      }
    };
    checkCookies();
  }, [])

  return ;
}

export default Configure