'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { UserButton, useAuth } from "@clerk/nextjs";
import { ArrowRightIcon, UploadCloud } from 'lucide-react';
import '@/app/css/additional-styles/mobile-menu.css'

export default function MobileMenu() {
  const { isSignedIn } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div className="md:hidden">

          {/* Hamburger button */}

          <button
            ref={trigger}
            className={`hamburger ${mobileNavOpen && 'active'}`}
            aria-controls="mobile-nav"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span className="sr-only">Menu</span>
            <label className="hamburger">
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </button>

          {/*Mobile navigation */}
          <nav
            id="mobile-nav"
            ref={mobileNav}
            className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
            style={mobileNavOpen ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
          >

            <ul className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-yellow-100
 px-4 py-2 z-20">
              <li>
                <Link href="/sign-in" className="flex font-medium w-full text-yellow-600 hover:text-gray-200 py-2 justify-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  Upload <UploadCloud />
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-yellow-600 hover:bg-yellow-700 transition duration-150 ease-in-out gap-2" onClick={() => setMobileNavOpen(false)}
                >
                  Get Started for Free <ArrowRightIcon size={20} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}