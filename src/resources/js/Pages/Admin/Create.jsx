import React, { useEffect,useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm,usePage } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import PageTitle from "@/Components/PageTitle";
import Checkbox from "@/Components/Checkbox";

export default function Create(props) {
    const {admin, roles, companies,adminRoles} = usePage().props;
    const [editForm ,setEditForm] = useState(admin?true:null); 
    const [showForm ,setShowForm] = useState(null); 
    // const [selected, setSelected] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: admin?admin.id: "",
        name: admin?admin.name: "",
        email: admin?admin.email: "",
        phone: admin?admin.phone: "",
        company_id: admin?admin.company_id: "",
        status: admin?admin.status: 0,
        password: "",
        password_confirmation: "",
        admin_roles: admin?adminRoles:"",
        role_id: admin && admin.roles[0]?admin.roles[0].id:""
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
        post(route("admins.store"));
    };


    const updateItem = (e) => {
        e.preventDefault();
        post(route('admins.update'),data,{
            forceFormData: true
        });
    };

    const statusCheckBox = (e) => {

        if( e.target.type ==='select-one'){
            setData({...data, [e.target.name]:e.target.value});

        }else{
         var isChecked = e.target.checked;  
         setData({...data, [e.target.name]:isChecked });
        }
    };
    

   let back = function()
    {
        window.history.back();
    }
    

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Manage Admin" />
            <PageTitle> Manage Admin
                <Link onClick={back} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>
            </PageTitle>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={editForm ? updateItem : storeItem }>
                    <label className="block text-sm mb-3">
                        <span className="text-gray-700 dark:text-gray-400">
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
                    <label className="block text-sm mb-3">
                        <span className="text-gray-700 dark:text-gray-400">
                            Title
                        </span>
                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="title"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label className="block text-sm mb-3">
                        <span className="text-gray-700 dark:text-gray-400">
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
                    <label className="block text-sm mb-3">
                            <span className="text-gray-700 dark:text-gray-400">
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

                     { editForm !=true&&
                        <>
                        
                        
                        <label className="block text-sm mb-3">
                            <span className="text-gray-700 dark:text-gray-400">
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
                                required
                            />
                        </label>
                        <label className="block text-sm mb-3">
                            <span className="text-gray-700 dark:text-gray-400">
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
                                required
                            />
                        </label>
                        </>
                     }
                     
                     <label className="block text-sm mb-3">
                        <span className="text-gray-700 dark:text-gray-400">
                            Company
                        </span>
                        <select  onChange={statusCheckBox} value={data.company_id}  name="company_id" id="company_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Company</option>
                                    {companies && companies.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>
                    <label className="block text-sm mb-3">
                        <span className="text-gray-700 dark:text-gray-400">
                            Admin Type (Role)
                        </span>
                        <select  onChange={statusCheckBox} value={data.role_id}  name="role_id" id="role_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Admin Type</option>
                                    {roles && roles.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>
                    <div className="mt-4">
                        <label className="block text-sm mb-3">
                            <input type="checkbox"
                                name="status"
                                checked={data.status}
                                value={data.status}
                                onChange={statusCheckBox}
                            /> Active / Inactive 
                        </label>
                    </div>
                    {/* <div className="flex items-center mt-4">
                    <span className="mr-1">Roles </span>
                    {roles && roles.map((value, index) => (
                        <label className="flex items-center" key={index}>
                        <input  type="checkbox" name="admin_roles[]" id={`role${value.id}`} value={data.id}     checked={data.admin_roles}                           
                        handleChange={checkBox} />
                                <span className="ml-2 text-sm text-indigo-600">
                                        {value.name}
                                </span>
                        </label>
                    ))}
                        
                    </div> */}
                     
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
