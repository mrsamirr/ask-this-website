
'use client';

import Link from 'next/link';
import Logo from '@/components/icons/LogoIcon';
import s from './Navbar.module.css';
import AnimationContainer from '../Animations/animation-container';



export default function Navlinks() {

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <AnimationContainer delay={0.1}>
        <div className="flex items-center flex-1">
          <Link href="/" className={s.logo} aria-label="Logo">
            <Logo />
          </Link>
          <nav className="ml-6 space-x-2 lg:block">
            <Link href="/" className="font-bold">
              Aurora.ai
            </Link>
          </nav>
        </div>
      </AnimationContainer>
      <AnimationContainer delay={0.1}>
        <div className="flex justify-end space-x-8">
          <Link href="/">
            Docs
          </Link>
        </div>
      </AnimationContainer>

    </div>
  );
}
