import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export const Footer = () => {
  return (
    <>
        <div className='w-full p-5 bg-[#ebebeb] mt-5'>
            <div className='container mx-auto justify-between flex-wrap md:flex-nowrap flex gap-8'>
                <div>
                    <p className='uppercase font-bold '>Shop</p>
                    <ul className='mt-2'>
                        <li>
                            <Link to="/products" className='nav-item'>All products</Link>
                        </li>
                        <li>
                            <Link to="/products/gadgets" className='nav-item'>Gadgets</Link>
                        </li>
                        <li>
                            <Link to="/products/audio" className='nav-item'>Audio</Link>
                        </li>
                        <li>
                            <Link to="/products/smart-appliances" className='nav-item'>Smart appliances</Link>
                        </li>
                        <li>
                            <Link to="/products/home-appliances" className='nav-item'>Home appliances</Link>
                        </li>
                        <li>
                            <Link to="/products/videogames" className='nav-item'>Videogames</Link>
                        </li>
                        <li>
                            <Link to="/products/mobile-phones" className='nav-item'>Mobile phones</Link>
                        </li>
                        <li>
                            <Link to="/products/computers" className='nav-item'>Computers</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className='uppercase font-bold '>Info</p>
                    <ul className='mt-2'>
                        <li>
                            <Link to="/help" className='nav-item'>Help</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className='nav-item'>Privacy policy</Link>
                        </li>
                        <li>
                            <Link to="/terms-and-conditions" className='nav-item'>Terms & conditions</Link>
                        </li>
                        <li>
                            <Link to="/about" className='nav-item'>About</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className='uppercase font-bold '>User</p>
                    <ul className='mt-2'>
                        <li>
                            <Link to="/account" className='nav-item'>Account</Link>
                        </li>
                        <li>
                            <Link to="/cart" className='nav-item'>Cart</Link>
                        </li>
                        <li>
                            <a href="http://localhost:9090/chat" className='nav-item'>Chat</a>
                        </li>
                        <li>
                            <a href="http://localhost:9090/realtimeproducts" className='nav-item'>Real time products</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo image" className='w-72' />
                    </Link>
                    <div className='flex gap-2 mt-4'>
                        <FiMapPin className='text-2xl text-myDarkColor'/>
                        <p>685 Market Street San Francisco, CA 94105, US</p>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <FiPhone className='text-2xl text-myDarkColor'/>
                        <p>Call us at (415) 555-5555</p>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <FiMail className='text-2xl text-myDarkColor'/>
                        <p>contact@tokytech.com</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-[#f3f3f3] py-2'>
            <div className='container mx-auto flex-col md:flex-row gap-3 flex justify-between items-center'>
                <p><span className='mr-1'>&copy;</span>2023 All Rights Reserved</p>
            </div>
        </div>
    </>
  )
}