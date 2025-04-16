import React from 'react'
import { z } from 'zod';
imprt {zodResolver} from '@hookform/resolvers/zod';

type Props = {}

cosnt addFriendFormSchema = z.object;

const AddFriendDialog = (props: Props) => {
  return (
    <div>AddFriendDialog</div>
  )
}

export default AddFriendDialog