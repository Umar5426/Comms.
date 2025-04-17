"use client";

import React from 'react'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { DialogDescription } from '@radix-ui/react-dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';


type Props = {}

const addFriendFormSchema = z.object({
    email: z.string().min(1, {message: 'Invalid email address'}).email({}),
});

const AddFriendDialog = (props: Props) => {

    const form = useForm<z.infer<typeof addFriendFormSchema>>({resolver: zodResolver(addFriendFormSchema), defaultValues: {email: ''}});

    const handleSubmit = async (data: z.infer<typeof addFriendFormSchema>) => {
        console.log(data);
    }
  return (
        <Dialog>
        <Tooltip>
            <DialogTrigger asChild>
            <TooltipTrigger asChild>
                <Button size="icon" variant="outline">
                <UserPlus />
                </Button>
            </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent>
            <p>Add Friends</p>
            </TooltipContent>
        </Tooltip>


        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                  Add Friends  
                </DialogTitle>
                <DialogDescription>
                    Send a request to connect with your friends!
                </DialogDescription>
            </DialogHeader>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField 
                    control={form.control} 
                    name="email" 
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your friend's email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                        <Button disabled={false} type="submit"> 
                            Send Request
                        </Button>
                    </DialogFooter>
                </form>
            </FormProvider>
        </DialogContent>
    </Dialog>
  )
}

export default AddFriendDialog;