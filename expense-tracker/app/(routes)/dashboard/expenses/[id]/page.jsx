"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budget/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpensesListTable from '../_components/ExpenseListTable';
import { Button } from '../../../../../components/ui/button';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState();
    const route=useRouter();
    useEffect(() => {
        user && getBudgetInfo();

    }, [user]);

    // Get Budget Information

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();

    }

    // Get Latest Expenses

    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));
        setExpensesList(result);
        console.log(result);

    }
    // Used to Delete Budget

    const deleteBudget = async ()=> {

        const deleteExpenseResult = await db.delete(Expenses)
        .where(eq(Expenses.budgetId,params.id))
        .returning();

        if(deleteExpenseResult)
        {
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
        }
        toast('Budget Deleted !')
        route.replace('/dashboard/budget')
    }

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='flex gap-2' variant="destructive"> <Trash /> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this budget along with expenses
                                from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? (
                    <BudgetItem
                        budget={budgetInfo}
                    />
                ) : (
                    <div className='w-full bg-slate-200 rounded-lg h-[145px] animate-pulse'>
                    </div>
                )}
                <AddExpense budgetId={params.id}
                    user={user}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpensesListTable expensesList={expensesList}
                    refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default ExpensesScreen
