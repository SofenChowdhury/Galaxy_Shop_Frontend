import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";
import Button from '@/Components/Button';
export default function Index(props) {

const {campaigns} = usePage().props;
    if (!campaigns) return "No Notifications found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>  
                <Head title="Notifications" />
                <PageTitle>Campaigns</PageTitle>
                <div className="float-right">
                    <Link  href={route('campaigns.create')} className="bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border-purple-900 rounded w-24 mb-5 text-base float-right"> 
                        <i  className="fas fa-plus"></i> Add 
                    </Link>
                </div>
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Campaign Title</th>
                                        <th className="px-4 py-3">Campaign Link</th>
                                        <th className="px-4 py-3">Start Time</th>
                                        <th className="px-4 py-3">End Time</th>
                                        <th className="px-4 py-3">Status</th>                                        
                                        <th className='px-4 py-3'>Action</th>                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {campaigns.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.campaign_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.campaign_slug}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.start_time}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.end_time}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Link href={route('campaigns.edit', value.id)} className="w-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                                    <i className='fa fa-edit'></i>
                                                    <span className='px-4 py-2'>Edit</span>                                                
                                                </Link>
                                                <Link method='delete' href={route('campaigns.destroy', value.id)} className='w-40 bg-orange-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
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
