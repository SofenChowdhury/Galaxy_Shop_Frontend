import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";

import PageTitle from "@/Components/PageTitle";

export default function Permission(props) {
    const { permissions } = usePage().props;

    if (!permissions) return "No Permissions Found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}> 
                <Head title="Permissions" />
                <PageTitle> Permissions</PageTitle>
                <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
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
                                {permissions.map((value, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3">
                                            {value.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            {value.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {value.guard_name}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-4 py-3">sfasd</td>
                                    <td className="px-4 py-3">sdfas</td>
                                    <td className="px-4 py-3">sdfa</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">sfasd</td>
                                    <td className="px-4 py-3">sdfas</td>
                                    <td className="px-4 py-3">sdfa</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">sfasd</td>
                                    <td className="px-4 py-3">sdfas</td>
                                    <td className="px-4 py-3">sdfa</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Authenticated>
        </>
    );
}
