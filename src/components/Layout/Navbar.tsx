"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../UI/Logo";
import Link from "next/link";
import PrimaryButton from "../UI/PrimaryButton";
import NavLogo from "../UI/NavLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      // Trigger pop down after scrolling 100px
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Guide",
      href: "/guide",
    },
    {
      name: "Research",
      href: "/research",
    },
  ];

  return (
    <>
      <div
        className={`w-full bg-[#FAF8F2] border-b-1 border-[#4C6F35] z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-[80px] max-md:px-2 relative">
          <div className="">
            <Link href="/">
              <img
                src="/NavLogo.png"
                alt="logo"
                className={`absolute top-0 max-lg:w-[100px] w-[200px] bg-transparent transition-all duration-300 ease-in-out ${
                  scrolled ? "top-[-40px]" : "top-0"
                }`}
              />
            </Link>
          </div>
          <div className="max-lg:hidden">
            <ul className="flex gap-7">
              {navLinks.map((navlinks, index) => {
                return (
                  <li key={index}>
                    <Link href={navlinks.href}>{navlinks.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="max-lg:hidden">
            <PrimaryButton name="Login" />
          </div>
          <button
            className="lg:hidden"
            onClick={toggleNavbar}
            aria-label="Hamburg-icon"
            type="button"
          >
            <FaBars className="text-[30px]" />
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out px-3 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <div className="flex items-center justify-between border-bottom py-3">
            <button
              onClick={toggleNavbar}
              aria-label="Hamburg-icon"
              type="button"
            >
              <FaTimes className="text-2xl text-[#414347]" />
            </button>
          </div>
          <ul className="flex flex-col gap-7">
            {navLinks.map((navlinks, index) => {
              return (
                <li key={index} className="text-center">
                  <Link href={navlinks.href}>{navlinks.name}</Link>
                </li>
              );
            })}
          </ul>
          <div className="py-4 text-center">
            <PrimaryButton name="Login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
