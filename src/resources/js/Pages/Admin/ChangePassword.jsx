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
    const [editForm] = useState(null); 
    const {message} = usePage().props;
    const { data, setData, post, errors } = useForm({
        password: "",
        password_confirmation: ""
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const updateItem = (e) => {
        e.preventDefault();
        post(route('store.change.password'),data,{
            forceFormData: true
        });
    };

   let back = function()
    {
        window.history.back();
    }
    

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Change Password" />
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
                            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">Change Password</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <PageTitle> Change Password
                <Link onClick={back} className="w-24 shadow-md	bg-yellow-300 add-btn hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>
            </PageTitle>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <SuccessMessage message={message} />
                <form onSubmit={updateItem }>
                    <div className="mt-4">
                        <Label forInput="password" value="Password" />
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <Label forInput="password_confirmation" value="Password Confirmation" />
                        <Input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            handleChange={onHandleChange}
                            required
                        />
                    </div>
                    
                     
                    <div className="flex items-center mt-4">
                        <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                            { editForm ? "Update":"Save"}
                        </Button>
                        
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
