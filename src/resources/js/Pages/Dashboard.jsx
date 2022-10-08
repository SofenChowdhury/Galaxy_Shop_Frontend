import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, usePage} from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";
import InfoCard from "@/Components/Cards/InfoCard";
import { dateformat } from "moment";
import { format } from 'date-fns';
export default function Dashboard(props) {
    const {orders, shops, customers, products} = usePage().props;
    return (
        <Authenticated auth={props.auth} errors={props.errors}>  
            <Head title="Dashboard" />
            <PageTitle>Dashboard</PageTitle>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total Orders" value={orders.total}>
                    <i className="fas fa-bag-shopping text-5xl text-red-700 text-cool-purple-600"></i>
                </InfoCard>
                <InfoCard title="Total Shop" value={shops.total}>
                    <i className="fas fa-store text-5xl text-green-400 text-cool-purple-600"></i>
                </InfoCard>
                
                <InfoCard title="Total Customers" value={customers.total}>
                    <i className="fas fa-users text-5xl text-orange-400 text-cool-purple-600"></i>
                </InfoCard>
                <InfoCard title="Total Products" value={products.total}>
                    <i className="fas fa-cart-flatbed text-5xl text-indigo-700 text-cool-purple-600"></i>
                </InfoCard>
            </div>

            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Latest Orders
            </h2>
                        
            <div className="w-full by overflow-hidden rounded-lg shadow-xs">               
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">Order Number</th>
                                <th className="px-4 py-3">Order Date</th>
                                <th className="px-4 py-3">Order Time</th>
                                <th className="px-4 py-3">Customer Name</th>
                                <th className="px-4 py-3">Customer Mobile</th>
                                <th className="px-4 py-3">Order Amount</th>
                                <th className="px-4 py-3">Payment Method</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {orders.data && orders.data.map((value, index) => (
                            <tr className="text-gray-700 dark:text-gray-400">
                                <td className="px-4 py-3">                                    
                                    <Link  href={route('orders.show', value.id )} className="text-blue-700"> 
                                       {value.order_number} 
                                    </Link>
                                    
                                </td>
                                <td className="px-4 py-3">
                                    {
                                        format(new Date(), 'dd-MM-yyyy', value.order_date)
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    {
                                        format(new Date(), 'KK:mm a', value.order_date)
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    {value.customer_name}
                                </td>
                                <td className="px-4 py-3">
                                    {value.customer_phone}
                                </td>
                                <td className="px-4 py-3">
                                    {value.total_amount}
                                </td>
                                <td className="px-4 py-3">
                                    {value.order_status}
                                </td>
                                <td className="px-4 py-3 text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                    {value.order_status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <Link  href={route('orders.edit',value.id )} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                        <i data-key={value.id} className="fas fa-pencil"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Customers
            </h2>
            <div className="grid gap-6 mb-8 by md:grid-cols-2">
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Revenue
                    </h4>
                    
                </div>
            </div>

            <div>
                {/* Charts */}
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Charts
                </h2>
                <div className="grid gap-6 mb-8 by md:grid-cols-2">
                    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                            Revenue
                        </h4>
                       <canvas id="pie" />
                        <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            Chart legend
                            <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full" />
                            <span>Shirts</span>
                            </div>
                            <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full" />
                            <span>Shoes</span>
                            </div>
                            <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full" />
                            <span>Bags</span>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                            Traffic
                        </h4>
                       <canvas id="line" />
                        <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            {/* Chart legend */}
                            <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full" />
                            <span>Organic</span>
                            </div>
                            <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full" />
                            <span>Paid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}
