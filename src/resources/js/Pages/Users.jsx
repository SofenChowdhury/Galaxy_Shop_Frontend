import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";

export default function Users(props) {
    const { users } = usePage().props;

    if (!users) return "No Users!";
    console.log(users);
    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}> 
                <Head title="Users" />
                <PageTitle>All users</PageTitle>
                <button
                    class="align-bottom inline-flex items-center justify-center w-36 mb-3 cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple"
                    type="button"
                >
                    <span>Add New</span>
                    <svg
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        class="h-5 w-5 ml-2 -mr-1"
                    >
                        <path
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3">Id</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                {users.map((value, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3">
                                            {value.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            {value.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {value.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
