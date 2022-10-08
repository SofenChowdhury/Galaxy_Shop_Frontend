import React,{useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
export default function Index(props) {
    const {roles} = usePage().props;
    console.log(roles);
    if (!roles) return "No Roles found!";

    return (
        <Authenticated auth={props.auth} errors={props.errors}> 
            <Head title="Attribute Prefix" />
                <PageTitle>Manage Roles</PageTitle>
            
                <Link  href={route('roles.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-24 mb-5 text-base"> 
                    <i  className="fas fa-plus"></i> Add 
                </Link>
                               
                <div className="mb-12 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Role Name</th>                          
                                        <th className="px-4 py-3">Permissions</th>                          
                                        <th className="px-4 py-3 text-right">Action</th>
                                        
                                    </tr>
                                </thead>
                                
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {roles && roles.map((value, index) => (                                         
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.name}
                                            </td>
                                            <td className="px-4 py-3">
                                            {value.permissions.map((value, index) => (
                                                <p className="bg-green-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-2.5 rounded dark:bg-green-200 dark:text-blue-400 m-2 float-left">  
                                                {value.name}
                                                </p>
                                            ))}
                                            </td>
                                            <td className="px-4 py-3  text-right">
                                                <Link  href={route('roles.edit',value.id )} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
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
    );
}
