import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";

export default function Index(props) {

const {coupons} = usePage().props;
    if (!coupons) return "No coupons found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}> 
                <Head title="Coupons" />
                <PageTitle>Coupons</PageTitle>
                <Link href={route('coupons.create')} className="w-32 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    add New
                </Link>
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Code</th>
                                        <th className="px-4 py-3">Type (Percentage / Amount)</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Min Car Value</th>
                                        <th className="px-4 py-3">Remaining</th>
                                        <th className="px-4 py-3">Used</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Start Time</th>
                                        <th className="px-4 py-3">End Time</th>
                                        <th className="px-4 py-3"></th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {coupons.map((value, index) => (                                        
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.code}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.type == 1? "Amount": "Percentage"}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.price_value}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.min_cart_value}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.times}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.used}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.user_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.status == 1 ? "Active": "Inactive"}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.start_date}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.end_date}
                                            </td>

                                            <td className="px-4 py-3">                                            
                                                <a href="" className='w-32 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'><i className='fa fa-edit'></i> Edit</a>
                                                <a href="" className='w-32 bg-red-700 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded mx-1'><i className='fa fa-trash'></i> Delete</a>
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
