import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { CopyIcon, CopyCheckIcon } from 'lucide-react'

const Footer = () => {
    const [copied, setCopied] = useState(false)
    const email = "subharthykuiry@gmail.com"
    const emailHandler = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setInterval(() => {
            setCopied(false)
        }, 1500)
    }
    return (
        <footer className="bg-white dark:bg-gray-900 z-30">
            <div className="mx-auto w-full max-w-screen-xl px-4 py-6 lg:py-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">

                    {/* Left Side */}
                    <div className="max-w-xl">
                        <motion.a
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center cursor-pointer ml-[-6rem]"
                        >
                            <Logo width={400} />
                        </motion.a>
                        <p className="mt-4 text-gray-400">
                            I’m Subharthy Kuiry, currently building an eCommerce site as a passion project.
                            Let’s connect and bring powerful ideas to life together.
                            Explore modern shopping experiences—design, develop,
                            and innovate with seamless tech and creativity.
                        </p>
                    </div>

                    {/* Right Side Sections */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto ml-[6rem]">
                        {/* Connect */}
                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Connect</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                                <li>
                                    <a href="https://api.whatsapp.com/send/?phone=917980647151&text=Hi+Subharthy%2C+I+saw+your+project%21&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                                          className="hover:underline">WhatsApp</a>
                                </li>
                                <li>
                                    <a href="https://github.com/S8kuiry" target="_blank" className="hover:underline">Github</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/subharthy-kuiry-5b568927b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                                </li>
                            </ul>
                        </div>

                        {/* Portfolio */}
                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Portfolio</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">

                                <li>
                                    <a href="https://portfolio-git-main-subharthys-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">My_Portfolio</a>
                                </li>
                            </ul>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">Email</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">


                                <button
                                    onClick={emailHandler}
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-white bg-[#ef55f7ff] rounded-sm flex items-center justify-center text-xs w-35"
                                >
                                    {copied ? (
                                        <>
                                            <CopyCheckIcon size={20} className="mr-2" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <CopyIcon size={20} className="mr-2" />
                                            Copy Email
                                        </>
                                    )}
                                </button>

                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        © 2023 <a href="#" className="hover:underline">Subharthy Kuiry</a>. All Rights Reserved.
                    </span>

                    {/* Social Icons */}
                    <div className="flex mt-4 sm:mt-0 gap-4">
                        {/* WhatsApp */}
                        <a href="https://api.whatsapp.com/send/?phone=917980647151&text=Hi+Subharthy%2C+I+saw+your+project%21&type=phone_number&app_absent=0" target="_blank"  rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                {/* WhatsApp path here */}
                            </svg>
                            <span className="sr-only">WhatsApp</span>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/subharthy-kuiry-5b568927b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                {/* LinkedIn path here */}
                            </svg>
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        {/* GitHub */}
                        <a href="https://github.com/S8kuiry" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                {/* GitHub path here */}
                            </svg>
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
