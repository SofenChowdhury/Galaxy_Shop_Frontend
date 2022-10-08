import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage, useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Common/Pagination";
import PageTitle from "@/Components/PageTitle";

export default function Index(props) {
    // const { orders } = usePage().props;
    const {orders, companies, admins, shops} = usePage().props;
    const [editForm, setEditForm] = useState(null); 
    const { data, setData, post, processing, errors, reset } = useForm({
        order_number: "",
        customer_phone: "",
        company_id: "",
        admin_id: "",
        order_date: "",
        order_status: ""
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const storeItem = (e) => {
        e.preventDefault();
        post(route("shops.store"));
    };
    if (!orders) return "No Product found!";
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Order List" />
            <PageTitle>Orders List</PageTitle>

            <div className="mb-4 w-full rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <div className="mb-2 grid grid-cols-5 gap-2">
                    <div className="flex flex-col">
                        <label for="order_number" className="mb-2 font-semibold">Order Number</label>
                        <input type="text" id="order_number" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input" />
                    </div>
                    <div className="flex flex-col">
                        <label for="customer_phone" className="mb-2 font-semibold">Customer Mobile</label>
                        <input type="text" id="customer_phone" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input" />
                    </div>
                    <div className="flex flex-col">
                        <label for="order_status" className="mb-2 font-semibold">Order Status</label>
                        <select name="order_status" id="order_status" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input">
                                <option value="">Select Status</option>                              
                                <option value="initiated">Initiated</option>                              
                                <option value="pending">Pending</option>                              
                                <option value="hold">Hold</option>                              
                                <option value="customer_confirmation">Customer Confirmation</option>                              
                                <option value="processing">Processing</option>                              
                                <option value="delivered">Delivered</option>                              
                                <option value="closed">Closed</option>                              
                                <option value="lost">Lost</option>                              
                                <option value="returned">Returned</option>                              
                                <option value="unreached">Unreached</option>                              

                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label for="order_status" className="mb-2 font-semibold">Company</label>
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
                        <label for="order_status" className="mb-2 font-semibold">Shops</label>
                        <select name="order_status" id="order_status" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input">
                                <option value="">Select Shop</option> 
                                {shops && shops.map((value, index) => (
                                    <option value={value.id}>{value.name}</option>
                                ))}                        

                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label for="order_date" className="mb-2 font-semibold">Order Date</label>
                        <input type="date" id="order_date" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input" />
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
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Order Number</th>
                                <th className="px-4 py-3">Device</th>
                                <th className="px-4 py-3">Order Date</th>
                                <th className="px-4 py-3">Customer Name</th>
                                <th className="px-4 py-3">Order Status</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Payment Status</th>
                                <th className="px-4 py-3">Options</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            {orders.data.map((value, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3">
                                    <Link
                                        href={route('orders.show', value.id)}
                                        className="">
                                        {value.order_number}
                                    </Link>
                                    </td>
                                    <td className="px-4 py-3">{value.device_type}</td>
                                    <td className="px-4 py-3">
                                    {/* <Moment subtract={{ hours: 6 }} format="DD MMM, YY hh:mm A" date={value.created_at} /> */}
                                    </td>
                                    <td className="px-4 py-3">{value.customer_name}</td>
                                    <td className="px-4 py-3">
                                        
                                        <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm dark:text-gray-100 dark:bg-gray-700 capitalize">
                                        {value.order_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{value.pay_amount}</td>
                                    <td className="px-4 py-3">{value.payment_status}</td>
                                    <td className="px-4 py-3">Options</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={orders.links} />
            </div>
        </Authenticated>
    );
}
