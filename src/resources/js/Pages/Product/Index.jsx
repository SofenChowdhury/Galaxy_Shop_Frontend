import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Common/Pagination";
import PageTitle from "@/Components/PageTitle";

export default function Index(props) {
    const { products } = usePage().props;
    if (!products) return "No Product found!";
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <nav className="mt-5 p-2 flex shadow-xs px-5 text-gray-700 bg-gray-50 rounded-lg  dark:bg-gray-800 by" aria-label="Breadcrumb">
                <ol className="inline-flex items-center">
                    <li className="inline-flex items-center">
                        <Link href={route('dashboard')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> Dashboard
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">Products</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <Head title="Product" />
            
            <div className="flex justify-between mb-2">
                <PageTitle>Products</PageTitle>
            </div>
            <div className="float-right">
                <Link  href={route('products.create')} className="bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border-purple-900 rounded w-24 mb-5 text-base float-right"> 
                    <i  className="fas fa-plus"></i> Add 
                </Link>
            </div>
            
            
            <div className="w-full overflow-hidden rounded-lg by  mb-8 drop-shadow-lg mt-5">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Thumbnail</th>
                                <th className="px-4 py-3">Model</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Price</th> 
                                <th className="px-4 py-3">Variant</th> 
                                <th className="px-4 py-3">Status</th> 
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            {products.data.map((value, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3">
                                         <p> {value.name}</p>
                                         <p><span className="text-gray-600"> <b>slug :</b> {value.slug}</span></p>
                                         <span className="text-gray-600"> <b>sku :</b> {value.sku}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <img src={`/storage/thumbnails/${value.photo}`} width={100}/>
                                    </td>
                                    <td className="px-4 py-3">{value.model}</td>
                                    <td className="px-4 py-3">{value.product_type}</td>
                                    <td className="px-4 py-3"> {value.regular_price}</td>
                                    <td className="px-4 py-3"> {value.regular_price}</td>
                                    <td className="px-4 py-3">
                                        <span className={value.status ? 'bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'
                                         :'bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'}>
                                        {value.status ? "active"  :'Unactive'}
                                    
                                       </span>
                                    </td>
                                    
                                    <td className="px-4 py-3  text-right">

                                       <Link href={route('products.edit', value.id)} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                            <i  className="fas fa-pencil"></i>
                                        </Link>

                                        <Link href={route('attribute.add', value.id)} title={value.status? "Inactive"  : "Active"}
                                            className={value.status ?'bg-green-400 hover:bg-green-500 text-white mr-2 py-2 px-4 rounded' :'bg-red-400 hover:bg-red-500 text-white mr-2 py-2 px-4 rounded'}> 
                                            <i className= {value.status ? "fas fa-long-arrow-up" : 'fas fa-long-arrow-down'}></i>
                                        </Link>

                                        <Link href={route('gallery.add' , value.id)} className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded"> 
                                            <i className="fas fa-plus"></i> Gallery
                                        </Link>
                                        <Link href={route('variant.add', value.id)} className="bg-hyandai-400 hover:bg-hyandai-500 text-white py-2 px-4 rounded"> 
                                            <i className="fas fa-plus"></i> Add Variant 
                                         </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={products.links} />
            </div>
        </Authenticated>
    );
}
