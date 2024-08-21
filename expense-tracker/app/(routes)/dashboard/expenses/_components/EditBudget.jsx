"use client"
import React, { useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { PenBox } from 'lucide-react'
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
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs'
import { Input } from '../../../../../components/ui/input'
import { db } from '../../../../../utils/dbConfig'
import { Budgets } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Budget from '../../budget/page'
import { toast } from 'sonner'



function EditBudget({budgetInfo, refreshData}) {

    if (!budgetInfo) {
        return <div></div>; // Add a fallback UI or return null
    }

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo.icon || '');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const { user } = useUser();
    
    

    const onUpdateBudget= async()=>{
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result)
        {
            refreshData()
            toast('Budget Updated')

        }
    }

  return (
    <div>
        <Dialog>
                <DialogTrigger asChild>
                <Button className='flex gap-2'> <PenBox/> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
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
                                    defaultValue={budgetInfo.name}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount (₹)</h2>
                                    <Input
                                        type="text"
                                        placeholder="e.g. ₹5,000"
                                        defaultValue={budgetInfo.amount}
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
                        <Button disabled={!(name && amount)} onClick={() => onUpdateBudget()} className='mt-5 w-full'>Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default EditBudget
