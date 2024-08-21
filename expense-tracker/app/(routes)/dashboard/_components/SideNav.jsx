"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {

    const menuList =[
        {
            id:1,
            name:"Dashboard",
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:"Budgets",
            icon:PiggyBank,
            path:'/dashboard/budget'
        },
        {
            id:3,
            name:"Expenses",
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
        
    ]

    const path = usePathname();

    useEffect(() => {
        
    }, [path])

    return (
        <div className='h-screen p-5 shadow-xl'> 
            <Image 
                src='/logo.svg'
                alt='logo'
                width={160}
                height={100}
                priority={true}  // Adding priority for LCP optimization
            />

            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <h2 className={`flex gap-2 items-center mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path === menu.path && `text-primary bg-blue-100`}`}>
                            <menu.icon/>
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav;
