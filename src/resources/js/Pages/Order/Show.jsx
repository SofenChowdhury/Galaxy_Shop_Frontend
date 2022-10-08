import React, { useState, useRef} from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage, useForm } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";
// import { format } from 'date-fns';
import DateFormat from "@/Components/DateFormat";
import PaymentModal from "@/Components/PaymentModal";
import AdPaymentModal from "@/Components/AddPaymentModal";

export default function Index(props) {
    const { order } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        order_status: '',
        id: order.id
    });
    const orderItems = order.order_item;
    // const orderDate = format(new Date(order.created_at), 'dd MMM yyyy h:mm aa');

    const handleChangeStatus = (event) => {
        if(order.order_status == event.target.value){
            alert("Already Selected");
            return false;
        }else if (order.order_status == 'delivered' || order.order_status == 'declined') {
            alert("Delivered or Declined Order Status not be Change");
            return false;
        }
        data.order_status = event.target.value;
        post(route('update.order'));
        
    };

    if (!order) return "No order found!";
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Order" />
            <PageTitle>Order Details</PageTitle>
           
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Order Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            <table className="w-full whitespace-no-wrap">
                                <tbody>
                                    <tr>
                                        <th className="px-4 py-3">Order Number</th>
                                        <td className="px-4 py-3">: {order.order_number}</td>
                                        <th className="px-4 py-3">Order Amount</th>
                                        <td className="px-4 py-3">: {order.total_amount}</td>
                                                                             
                                    </tr>
                                    <tr>
                                        
                                        <th className="px-4 py-3">Order Date</th>
                                        <td className="px-4 py-3">: 
                                        <DateFormat date={order.created_at} dateFormat={'dd MMM yyyy h:mm aa'}></DateFormat>
                                        </td>
                                        <th className="px-4 py-3">Company</th>
                                        <td className="px-4 py-3">: {order.user?.company?.name}</td>
                                                                             
                                    </tr>
                                    <tr>                                        
                                        <th className="px-4 py-3">Customer Name</th>
                                        <td className="px-4 py-3">: {order.customer_name}</td>
                                        <th className="px-4 py-3">Branch</th>
                                        <td className="px-4 py-3">: {order.user?.shop?.title}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Customer Mobile</th>
                                        <td className="px-4 py-3">: {order.customer_phone}</td>
                                        <th className="px-4 py-3">City </th>
                                        <td className="px-4 py-3">: {order.customer_city}</td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Order Status</th>
                                        <td className="px-4 py-3">: 
                                            <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-yellow-300 rounded-sm dark:text-gray-100 dark:bg-gray-700 uppercase">
                                            {order.order_status}
                                            </span>
                                        </td>       
                                        <th className="px-4 py-3">Customer Thana</th>
                                        <td className="px-4 py-3">: {order.customer_thana}</td>                       
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-3">Change Status</th>
                                        <td className="px-4 py-3">
                                            <form method="get">
                                                <select name="order_status" onChange={handleChangeStatus} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="hold">Hold</option>
                                                    <option value="confirmation">Confirmation</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="declined">Declined</option>
                                                </select>
                                            </form>
                                            
                                        </td>                                                       <th className="px-4 py-3">Address</th>
                                        <td className="px-4 py-3">: {order.customer_address}</td>
                                                          
                                    </tr>
                                    
                                    
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Ordered Items</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            <table className="w-full border-collapse border border-slate-400">
                                
                                <tbody>
                                    <tr>
                                        <th className="px-4 py-3 text-left">Item ID</th>
                                        <th className="px-4 py-3 text-left">Item SKU</th>
                                        <th className="px-4 py-3 text-left">Item Title</th>
                                        <th className="px-4 py-3 text-left">Details</th>
                                        <th className="px-4 py-3 text-right">Price</th>
                                        <th className="px-4 py-3 text-right">QTY</th>                                        
                                        <th className="px-4 py-3 text-right">Sub-total</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                                                             
                                    </tr>
                                    
                                        {orderItems.map( (itemValue, index) => (
                                                <tr>
                                                    <td className="px-4 py-3 text-left">{itemValue.item_info.id} </td>
                                                    <td className="px-4 py-3 text-left"> {itemValue.item_info.sku} </td>
                                                    <td className="px-4 py-3 text-left"> {itemValue.item_info.title} </td>
                                                    <td className="px-4 py-3 text-left"> 
                                                    
                                                    </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.item_price} </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.qty} </td>
                                                    <td className="px-4 py-3 text-right"> {itemValue.item_price * itemValue.qty} </td>
                                                    <td className="px-4 py-3 text-center"> 
                                                    <button className="px-4 py-2 text-sm bg-orange-500 border text-white font-bold uppercase  rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        > Edit</button>
                                                        <button className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-400 hover:bg-red-700 focus:outline-none shadow hover:shadow-lg focus:shadow-outline-purple"
                                                        > Delete</button>
                                                        
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full overflow-auto rounded-lg shadow-xs mb-8 drop-shadow-lg">
                <div className="w-full overflow-x-auto">
                    
                    <table className="w-full whitespace-no-wrap border">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Approval History</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            <table className="w-full border-collapse border border-slate-400">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left">SL</th>
                                        <th className="px-4 py-3 text-left">Approved By</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-left">Note</th>
                                        <th className="px-4 py-3 text-right">Approved At</th>
                                                                             
                                    </tr>
                                </thead>
                                <tbody>
                                {order.histories?.map( (history, index) => (
                                    <tr>
                                        <td className="px-4 py-3 text-left">1</td>
                                        <td className="px-4 py-3 text-left">{history?.admin?.name}</td>
                                        <td className="px-4 py-3 text-left">
                                            <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-yellow-300 rounded-sm dark:text-gray-100 dark:bg-gray-700 uppercase">
                                            {history.title}
                                            </span>    
                                        </td>
                                        <td className="px-4 py-3 text-left">{history.note}</td>
                                        <td className="px-4 py-3 text-left">
                                        <DateFormat date={history.created_at} dateFormat={'dd-MMM-yyyy h:mm aa'}></DateFormat>
                                        </td>
                                    </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </tbody>
                    </table>
                </div>
            </div>
            <PaymentModal title={"Payment Information"} payments={order.payments}></PaymentModal>
            <AdPaymentModal title={"Add Payment"}></AdPaymentModal>
        </Authenticated>
    );
}
