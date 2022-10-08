import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head,usePage } from '@inertiajs/inertia-react';


export default function Users(props) {

const {users} = usePage().props;
    
    if (!users) return "No Users!";

    return (
        <>
            <Head title="Users" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-12xl mx-auto sm:px-12 lg:px-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                 users.map((value , index)=>(
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="flex justify-between">
                        <div className="order-last">01</div>
                        <div>02</div>
                        <div>03</div>
                    </div>
                </div>
            </div>
        </>
    );
}
