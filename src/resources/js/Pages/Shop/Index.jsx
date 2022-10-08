import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";
import Pagination from "@/Components/Common/Pagination";

export default function Index(props) {
    const { shops, companies} = usePage().props;
    return (
            <Authenticated auth={props.auth} errors={props.errors}>  
                <Head title="Manage Shops" />
                <PageTitle><span className="text-left">Manage Shops</span>  
                
                </PageTitle>
                <div className="float-right">
                    <Link  href={route('shops.create')} className="bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border-purple-900 rounded w-24 mb-5 text-base float-right"> 
                        <i  className="fas fa-plus"></i> Add 
                    </Link>
                </div>
                

                <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                    <div className="mb-2 grid grid-cols-5 gap-2">
                    
                   
                        <div className="flex flex-col">
                            <label for="order_status" className="mb-2 font-semibold">Company </label>
                            <select name="order_status" id="order_status" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Company</option> 
                                    {companies && companies.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}                        

                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label for="order_date" className="mb-6 font-semibold"></label>
                            <button
                                type="button"
                                class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i> Search
                            </button>
                        </div>                   
                        
                    </div>
                </div>
                
                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3">Show Users</th>
                                        <th className="px-4 py-3">contact person</th>
                                        <th className="px-4 py-3">contact number</th>
                                        <th className="px-4 py-3">contact email</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {shops.data.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.company.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.users.map((user, index) => (
                                                    <p className="bg-green-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-2.5 rounded dark:bg-green-200 dark:text-blue-400 m-2 float-left">  
                                                    {user.name}
                                                    </p>
                                                ))}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.contact_person}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.contact_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.contact_email}
                                            </td>
                                            
                                            <td className="px-4 py-3">
                                                {value.status? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> Active </span> : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"> Inactive </span>}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link  href={route('shops.edit', value.uuid )} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                                    <i className="fas fa-pencil"></i>
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={shops.links} />
                    </div>
                </div>
            </Authenticated>
    );
}
