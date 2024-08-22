import React from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Hero() {
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage Your Expense</h1><h1 className="text-3xl font-extrabold sm:text-5xl">
                        <strong className="font-extrabold text-primary sm:block">Control Your Money</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start creating your budget and save tons of money.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-950 sm:w-auto"
                            href="/sign-in"
                        >
                            Get Started
                        </a>

                        {/* Show Dashboard button only if the user is signed in */}
                        <SignedIn>
                            <Link href={'/dashboard'}>
                                <button className="block w-full rounded bg-gray-200 px-12 py-3 text-sm font-medium text-black shadow hover:bg-gray-300 focus:outline-none focus:ring active:bg-gray-400 sm:w-auto">
                                    Dashboard
                                </button>
                            </Link>
                        </SignedIn>

                        {/* Optionally, handle the signed out state */}
                        <SignedOut>
                            
                        </SignedOut>
                    </div>
                </div>
            </div>

            <Image
                src={'/dashboard.jpg'}
                alt='dashboard'
                width={1000}
                height={900}
                className='rounded-xl border-2 mb-10'
            />
        </section>
    );
}

export default Hero;
