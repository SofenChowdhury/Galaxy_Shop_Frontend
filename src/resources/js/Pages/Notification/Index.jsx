import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";
import Button from '@/Components/Button';
export default function Index(props) {

const {notifications} = usePage().props;
    if (!notifications) return "No Notifications found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}> 
                <Head title="Notifications" />
                <PageTitle>Notifications</PageTitle>
                <Link href={route('notifications.create')} className="w-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Create Notifications
                </Link>
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Title</th>
                                        <th className='px-4 py-3'>Action</th>                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {notifications.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.heading}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link href={route('notifications.index')} className="w-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                                    <i className='fa fa-edit'></i>
                                                    <span className='px-4 py-2'>Edit</span>                                                
                                                </Link>
                                                <Link method='delete' href={route('notifications.destroy', value.id)} className='w-40 bg-orange-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
                                                    <i className='fa fa-trash'></i>
                                                    <span className='px-4 py-2'>Delete</span>  
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
