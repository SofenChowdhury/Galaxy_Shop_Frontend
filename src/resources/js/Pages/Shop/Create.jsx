import React, { useEffect,useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm,usePage } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import PageTitle from "@/Components/PageTitle";
import Checkbox from "@/Components/Checkbox";

export default function Create(props) {
    const {companies} = usePage().props;
    const [editForm, setEditForm] = useState(null); 
    const { data, setData, post, processing, errors, reset } = useForm({
        id:"",
        title: "",
        dms_code: "",
        contact_person: "",
        contact_number: "",
        contact_email: "",
        contact_address: "",
        company_id: "",
        status: 0
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


    const updateItem = (e) => {
        e.preventDefault();
        post(route('shops.update'),data,{
            forceFormData: true
        });
    };

    const companySelection = (e) => {
        this.setState({company_id:e.target.value});
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
            <Head title="Create Shop" />
            <PageTitle> Create Shop
            </PageTitle>
            <Link  onClick={back} className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-700 rounded w-24 mb-5 text-base"> 
                <i className="fas fa-chevron-left"></i> Back
            </Link>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={editForm ? updateItem : storeItem }>
                    <div className="mb-4 grid grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label for="text" className="mb-2 font-semibold">Shop Name</label>
                            <Input
                                type="text"
                                name="title"
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
                            <label for="text" className="mb-2 font-semibold">DMS Code</label>
                            <Input
                                type="text"
                                name="dms_code"
                                value={data.dms_code}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label for="text" class="mb-2 font-semibold">Contact Person</label>
                            <Input
                                type="text"
                                name="contact_person"
                                value={data.contact_person}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}
                                
                            />
                        </div>
                        <div className="flex flex-col">
                            <label for="text" className="mb-2 font-semibold">Contact Number</label>
                            <Input
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}                            
                            />
                        </div>
                        
                    </div>

                    <div className="mb-4 grid grid-cols-4 gap-4">
                        <div className="flex flex-col">
                            <label for="text" className="mb-2 font-semibold">Contact Email</label>
                            <Input
                                type="text"
                                name="contact_email"
                                value={data.contact_email}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}                            
                            />
                        </div>

                        <div className="flex flex-col">
                            <label for="text" className="mb-2 font-semibold">Contact Address</label>
                            <Input
                                type="text"
                                name="contact_address"
                                value={data.contact_address}
                                className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                handleChange={onHandleChange}                            
                            />
                        </div>
                        <div className="flex flex-col">
                            <label for="text" className="mb-2 font-semibold">Company</label>
                                <select  onChange={statusCheckBox} value={data.company_id}  name="company_id" id="company_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input">
                                        <option value="">Select Company</option>
                                        {companies && companies.map((value, index) => (
                                            <option value={value.id}>{value.name}</option>
                                        ))}

                                </select>
                        </div>
                    </div>  
                    <div className="mt-4">
                           <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="status"
                                    checked={data.status}
                                    value={data.status}
                                    onChange={statusCheckBox}
                                /> Active / Inactive 
                            </label>
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
