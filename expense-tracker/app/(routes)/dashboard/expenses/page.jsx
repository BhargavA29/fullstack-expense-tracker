"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../utils/dbConfig';
import { eq, desc } from 'drizzle-orm';
import { Expenses, Budgets } from '../../../../utils/schema';
import ExpenseListTable from './_components/ExpenseListTable';

function ExpensesPage() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      getAllExpenses();
    }
  }, [user]);

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id))
      .execute();

    setExpensesList(result);
  };

  return (
    <div className='p-5'>
      <h2 className='font-bold text-2xl'>My Expenses</h2>
      <div className='mt-4'>
        <ExpenseListTable expensesList={expensesList} />
      </div>
    </div>
  );
}

export default ExpensesPage;
