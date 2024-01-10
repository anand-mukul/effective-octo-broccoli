"use client";

import Link from 'next/link'
import Image from "next/image";
import React from "react";
import MobileMenu from './mobile-menu'
import { useAuth } from "@clerk/nextjs";
import '@/app/css/button/sign-in.css'
import '@/app/css/button/sign-up.css'

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="NeoSync">
              <Image
                src='/images/neosync.svg'
                alt='NeoSync'
                width={50}
                height={50}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          {isSignedIn ? (
            <div></div>

          ) : (
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    href="/sign-in"
                    className="font-medium text-yellow-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    <button className='sign-in'>
                      <span className="circle1"></span>
                      <span className="circle2"></span>
                      <span className="circle3"></span>
                      <span className="circle4"></span>
                      <span className="circle5"></span>
                      <span className="text">Sign in</span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="sign-up ml-3">
                    Sign up
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
