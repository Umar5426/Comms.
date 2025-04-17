import React from 'react'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {}

const addFriendFormSchema = z.object({
    email: z.string().min(1, {message: 'Invalid email address'}).email({}),
});

const AddFriendDialog = (props: Props) => {

    const form = useForm<z.infer<typeof addFriendFormSchema>>({resolver: zodResolver(addFriendFormSchema), defaultValues: {email: ''}});
  return (
    <div>AddFriendDialog</div>
  )
}

export default AddFriendDialog