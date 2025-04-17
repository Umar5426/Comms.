"use client";

import React from 'react'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog";

type Props = {}

const addFriendFormSchema = z.object({
    email: z.string().min(1, {message: 'Invalid email address'}).email({}),
});

const AddFriendDialog = (props: Props) => {

    const form = useForm<z.infer<typeof addFriendFormSchema>>({resolver: zodResolver(addFriendFormSchema), defaultValues: {email: ''}});
  return (
    <Dialog>
        <Tooltip>
            <TooltipTrigger>
                <Button size="icon" variant={'outline'}>
                    <DialogTrigger>

                        <UserPlus/>
                    </DialogTrigger>
                </Button>
            </TooltipTrigger>
        </Tooltip>
    </Dialog>
  )
}

export default AddFriendDialog