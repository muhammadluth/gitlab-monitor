import React from "react";
import Link from "next/link";

export default function Navbar(props) {
  const LogoLetter = ({ letter }) => (
    <span className="letter inline-block top-0 relative">{letter}</span>
  );
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="logo text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="/"
              >
                <LogoLetter letter="G" />
                <LogoLetter letter="i" />
                <LogoLetter letter="t" />
                <LogoLetter letter="L" />
                <LogoLetter letter="a" />
                <LogoLetter letter="b" />
                <span>&nbsp;</span>
                <LogoLetter letter="M" />
                <LogoLetter letter="o" />
                <LogoLetter letter="n" />
                <LogoLetter letter="i" />
                <LogoLetter letter="t" />
                <LogoLetter letter="o" />
                <LogoLetter letter="r" />
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
