"use client"

import { checkForCookies } from '@/api/auth';
import { addTree, registered } from '@/redux/userSlice';
import ErrorResponse from '@/types/errorMsg';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import type { AxiosError} from 'axios';
import { formatNodes } from '@/lib/formatNode';


const Configure = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCookies = async () => {
      try {
        const res = await checkForCookies();
        const tree = res.data.data;
        console.log(tree);

        const formatedNode=formatNodes(tree.nodes);
        
        dispatch(registered(true));
        dispatch(addTree({nodes:formatedNode,edges:tree.edges,treeName:tree.treeName}))
      } catch (e) {
        const err = (e as AxiosError<ErrorResponse>).response?.data?.message;
        console.log(err)
      }
    };
    checkCookies();
  }, [])

  return ;
}

export default Configure