"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../UI/Logo";
import Link from "next/link";
import PrimaryButton from "../UI/PrimaryButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
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
      <div className="w-full bg-white ">
        <div className="container mx-auto flex items-center justify-between py-4 max-md:px-2">
          <div>
            <Logo />
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
            <FaBars className="text-[30px] lg:hidden" onClick={toggleNavbar} />
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform px-3 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <div className="flex items-center justify-between border-bottom py-3">
            <Logo />
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
