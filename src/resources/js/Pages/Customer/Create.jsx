import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm, usePage} from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import PageTitle from "@/Components/PageTitle";


export default function Create(props) {
    
    const {customer, companies, shops} = usePage().props;
    const [editForm ,setEditForm] = useState(customer?true:null); 
    const { data, setData, post, processing, errors, reset } = useForm({
        id: customer?customer.id: "",
        name: customer? customer.name:"",
        email: customer? customer.email:"",
        phone: customer? customer.phone:"",
        company_id: customer? customer.company_id:"",
        shop_id: customer? customer.shop_id:"",
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const statusCheckBox = (e) => {

        if( e.target.type ==='select-one'){
            setData({...data, [e.target.name]:e.target.value});

        }else{
         var isChecked = e.target.checked;  
         setData({...data, [e.target.name]:isChecked });
        }
    };

    const storeItem = (e) => {
        e.preventDefault();
        post(route("customers.store"));
    };
    const updateItem = (e) => {
        e.preventDefault();
        post(route('customer.update', customer.id), data,{
            forceFormData: true
        });
    };
    let back = function()
    {
        window.history.back();
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Create Customer" />
            <PageTitle> Create Customer  </PageTitle>
            <Link  onClick={back} className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-700 rounded w-24 mb-5 text-base"> 
                <i className="fas fa-chevron-left"></i> Back
            </Link>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={editForm ? updateItem : storeItem }>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Name
                        </span>
                        <span class="text-gray-700 dark:text-gray-400">
                            Name
                        </span>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Email
                        </span>
                        <Input
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="email"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Mobile
                        </span>
                        <Input
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="phone"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <div className="flex flex-col">
                        <label for="company_id" className="mb-2 font-semibold">Company</label>
                        <select onChange={statusCheckBox} value={data.company_id} name="company_id" id="company_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
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
                        <label for="shop_id" className="mb-2 font-semibold">Shops</label>
                        <select onChange={statusCheckBox} value={data.shop_id} name="shop_id" id="shop_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input">
                                <option value="">Select Shop</option> 
                                {shops && shops.map((value, index) => (
                                    <option value={value.id}>{value.title}</option>
                                ))}                        

                        </select>
                    </div>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Password
                        </span>
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Confirm Password
                        </span>
                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            handleChange={onHandleChange}
                        />
                    </label>
                    <Button
                        className="bg-purple-500 text-white px-8 py-2 
                        rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900 transition-all hover:-translate-y-1"
                        processing={processing}
                    >
                        { editForm ? "Update":"Create"}
                    </Button>
                </form>
            </div>
        </Authenticated>
    );
}
