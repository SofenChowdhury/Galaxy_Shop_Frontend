import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";

export default function Index(props) {
    const { admins } = usePage().props;
    console.log(props);
    if (!admins) return "No Users found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}> 
                <Head title="Manage Admin" />
                <PageTitle>Manage Admin</PageTitle>
                <Link  href={route('admins.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24 mb-5 text-base"> 
                    <i  className="fas fa-plus"></i> Add 
                </Link>
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Mobile</th>
                                        <th className="px-4 py-3">Roles</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {admins.map((value, index) => (
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
                                            <td className="px-4 py-3">
                                                {value.phone}
                                            </td>
                                            <td>
                                                {value.roles.map((role, i) => (
                                                    <span className="bg-btnInfo text-mainColor rounded-md p-2 mr-1">{role.name}</span>
                                                ))}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.status? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> Active </span> : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"> Inactive </span>}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link  href={route('admins.edit',value.id )} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                                    <i data-key={value.id} className="fas fa-pencil"></i>
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
