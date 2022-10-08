import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Dropdown, DropdownItem } from "@windmill/react-ui";

export default function Header({auth}) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);       
    }

    const { post } = useForm();
    const submit = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (            
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                

                <div className="flex justify-center flex-1 lg:mr-32">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <i className="fas fa-search w-4 h-4"></i>
                        </div>
                        <input
                            className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                            type="text"
                            placeholder="Search for projects"
                            aria-label="Search"
                        />
                    </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    <li className="flex">
                        <button
                            className="rounded-md focus:outline-none focus:shadow-outline-purple"
                            aria-label="Toggle color mode"
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        </button>
                    </li>

                    {/* Notifications menu */}
                    <li class="relative">
                        <button
                            class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                            aria-label="Notifications"
                            aria-haspopup="true"
                        >
                            <svg
                                class="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                            <span
                                aria-hidden="true"
                                class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                            ></span>
                        </button>
                        <template x-if="isNotificationsMenuOpen">
                            <ul class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                                <li class="flex">
                                    <a
                                        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="#"
                                    >
                                        <span>Messages</span>
                                        <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                            13
                                        </span>
                                    </a>
                                </li>
                                <li class="flex">
                                    <a
                                        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="#"
                                    >
                                        <span>Sales</span>
                                        <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                            2
                                        </span>
                                    </a>
                                </li>
                                <li class="flex">
                                    <a
                                        class="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        href="#"
                                    >
                                        <span>Alerts</span>
                                    </a>
                                </li>
                            </ul>
                        </template>
                    </li>
                    <li class="relative">
                        <button
                            class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                            aria-label="Account"
                            aria-haspopup="true"
                            onClick={toggleDropdown}
                        >
                            <img
                                class="object-cover w-8 h-8 rounded-full"
                                src={`/storage/admin/profile/${auth.photo}`}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                        <Dropdown
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                            aria-label="submenu">
                            <Link 
                                href={route('user.profile')} 
                                className={ "inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100"} >
                                <i className="w-4 h-4 mr-3 fas fa-user"></i>
                                <span> Update Account</span>
                            </Link>
                            <Link 
                                href={route('change.password')} 
                                className={ "inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100"} >
                                <i className="w-4 h-4 mr-3 fas fa-lock"></i>
                                <span> Change Password</span>
                            </Link>
                            <form method="POST" onSubmit={submit}>
                                <DropdownItem
                                    tag="button"
                                    type="submit"
                                    method="post"
                                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold 
                                        transition-colors duration-150 rounded-md hover:bg-gray-100"
                                >
                                    <i className="w-4 h-4 mr-3 fas fa-arrow-right-from-bracket"></i>
                                    <span>Logout</span>
                                </DropdownItem>
                            </form>
                            
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
}
