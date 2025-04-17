import React from 'react'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

type Props = {}

const addFriendFormSchema = z.object;

const AddFriendDialog = (props: Props) => {
  return (
    <div>AddFriendDialog</div>
  )
}

export default AddFriendDialog