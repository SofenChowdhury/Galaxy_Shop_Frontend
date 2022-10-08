require("./bootstrap");
require("./custom");

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { Link, usePage } from "@inertiajs/inertia-react";
import Authenticated from "./Layouts/Authenticated";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(
            <>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900 false">
                    <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
                        <div class="py-4 text-gray-500 dark:text-gray-400">
                            <a
                                class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                                href="#"
                            >
                                Hyundai
                            </a>
                            <ul class="mt-6">
                                <li className="relative px-6 py-3">
                                    <span
                                        class=""
                                        aria-hidden="true"
                                        className={
                                            URL === "/dashboard"
                                                ? "active absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                                : ""
                                        }
                                    ></span>

                                    <Link
                                        href={route("dashboard")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                        </svg>
                                        <span class="ml-4">Dashboard</span>
                                    </Link>
                                </li>

                                <li className="relative px-6 py-3">
                                    <span
                                        class=""
                                        aria-hidden="true"
                                        className={
                                            URL === "/users"
                                                ? "active absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                                : ""
                                        }
                                    ></span>
                                    <Link
                                        href={route("users")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                        </svg>
                                        <span className="ml-4">Users</span>
                                    </Link>
                                </li>

                                <li className="relative px-6 py-3">
                                    <span
                                        class=""
                                        aria-hidden="true"
                                        className={
                                            URL === "/users"
                                                ? "active absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                                : ""
                                        }
                                    ></span>
                                    <Link
                                        href={route("admins.index")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                        </svg>
                                        <span className="ml-4">Admins</span>
                                    </Link>
                                </li>

                                <li className="relative px-6 py-3">
                                    <span
                                        class=""
                                        aria-hidden="true"
                                        className={
                                            URL === "/users"
                                                ? "active absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                                : ""
                                        }
                                    ></span>
                                    <Link
                                        href={route("admins.create")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                        </svg>
                                        <span className="ml-4">
                                            Create Admin
                                        </span>
                                    </Link>
                                </li>

                                <li className="relative px-6 py-3">
                                    <Link
                                        href={route("permissions.index")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                        as="button"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                        </svg>
                                        <span className="ml-4">
                                            Permissions
                                        </span>
                                    </Link>
                                </li>

                                <li className="relative px-6 py-3">
                                    <Link
                                        href={route("logout")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                        method="post"
                                        as="button"
                                    >
                                        <svg
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                        >
                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        <span className="ml-4">Log Out</span>
                                    </Link>
                                </li>
                                <li className="relative px-6 py-3">
                                    <Link
                                        href={route("login")}
                                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                        as="button"
                                    >
                                        <svg
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-4 h-4 mr-3"
                                            aria-hidden="true"
                                        >
                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        <span className="ml-4">Log In</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <div class="flex flex-col flex-1 w-full">
                        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
                            <div class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                                <button
                                    className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                                    aria-label="Menu"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <div className="flex justify-center flex-1 lg:mr-32">
                                    <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                                        <div className="absolute inset-y-0 flex items-center pl-2">
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
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
                                                ariaHidden="true"
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
                                        >
                                            <img
                                                class="object-cover w-8 h-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        </button>
                                        <template x-if="isProfileMenuOpen">
                                            <ul
                                                class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                                                aria-label="submenu"
                                            >
                                                <li class="flex">
                                                    <a
                                                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                        href="#"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 mr-3"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                        </svg>
                                                        <span>Profile</span>
                                                    </a>
                                                </li>
                                                <li class="flex">
                                                    <a
                                                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                        href="#"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 mr-3"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                        </svg>
                                                        <span>Settings</span>
                                                    </a>
                                                </li>
                                                <li class="flex">
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                >
                                                    Log Out
                                                </Link>
                                                    {/* <a
                                                        class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                                        href="#"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 mr-3"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                                        </svg>
                                                        <span>Log out</span>
                                                    </a> */}
                                                </li>
                                            </ul>
                                        </template>
                                    </li>
                                </ul>
                            </div>
                        </header>
                        <main className="h-full pb-16 overflow-y-auto">
                            <div className="container px-6 mx-auto grid">
                                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                    Page Title
                                </h2>
                                <App {...props} />
                            </div>
                        </main>
                    </div>
                </div>
            </>,
            el
        );
    },
});

InertiaProgress.init({ color: "#4B5563" });
