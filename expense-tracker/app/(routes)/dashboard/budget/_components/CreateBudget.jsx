"use client"
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "../../../../../components/ui/dialog"

import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import EmojiPicker from 'emoji-picker-react'
import { db } from '../../../../../utils/dbConfig'
import { Budgets } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'



function CreateBudget({refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState('🤩');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const { user } = useUser();

    /**
     * Used to Create New Budget
     */
    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon
            }).returning({ insertedId: Budgets.id })

        if (result) {
            refreshData()
            toast('New Budget Created')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant="outline"
                                    size="lg"
                                    className='text-lg'
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >{emojiIcon}</Button>
                                {openEmojiPicker && (
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: '35%',
                                            left: '5%',
                                            zIndex: 50,
                                            backgroundColor: 'white',
                                            opacity: 1,
                                            zIndex: 50,
                                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '0.5rem',
                                            padding: '1rem',
                                            maxHeight: '56vh',
                                            maxWidth: '80vh',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                            style={{
                                                backgroundColor: 'white',
                                                opacity: 1,
                                            }}
                                        />
                                    </div>
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input placeholder="e.g. Home Decor"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount (₹)</h2>
                                    <Input
                                        type="text"
                                        placeholder="e.g. ₹5,000"
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            setAmount(value);
                                        }}
                                    />
                                </div>


                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                        <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className='mt-5 w-full'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudget;
