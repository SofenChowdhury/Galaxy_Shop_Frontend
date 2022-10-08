import React, { useEffect,useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm,usePage, url } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import SuccessMessage from "@/Components/SuccessMessage";
import PageTitle from "@/Components/PageTitle";
import Label from "@/Components/Label";

export default function Create(props) {
    const {message, user} = usePage().props;
    const { data, setData, post, errors } = useForm({
        title: user?.title,
        name: user?.name,
        phone: user? user.phone:"",
        picture: user? user.photo:"",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]:event.target.value
        );
    };
    const updateItem = (e) => {
        e.preventDefault();
        post(route('update.user.profile'),data,{
            forceFormData: true
        });
    };

   let back = function()
    {
        window.history.back();
    }    

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="User Profile" />
            <nav className="mt-5 p-2 flex shadow-xs px-5 text-gray-700 bg-gray-50 rounded-lg  dark:bg-gray-800 by" aria-label="Breadcrumb">
                <ol className="inline-flex items-center">
                    <li className="inline-flex items-center">
                        <Link href={route('dashboard')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <i className="fas fa-home mr-2 w-4 h-4"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <i className="fas fa-arrow-right w-6 h-6 text-gray-400"></i>
                            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">User Profile</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <PageTitle> User Profile
                <Link onClick={back} className="w-24 shadow-md	bg-yellow-300 add-btn hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>
            </PageTitle>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <SuccessMessage message={message} />
                <form onSubmit={updateItem }>
                    <div className="mb-4 grid grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2 font-semibold">Name</label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-2 font-semibold">Title</label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={data.title}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="mb-2 font-semibold">Mobile</label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={data.phone}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="picture" className="mb-2 font-semibold">Profile Picture</label>
                            <Input
                                type="file"
                                name="picture"
                                id="picture"
                                value={data.photo}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                            />
                        </div>
                    </div>
                    
                     
                    <div className="flex items-center mt-4">
                        <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                            Update
                        </Button>
                        
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
