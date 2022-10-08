import React, {useState} from "react";
import { Inertia } from '@inertiajs/inertia'
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head, usePage, useForm } from '@inertiajs/inertia-react';
import PageTitle from "@/Components/PageTitle";
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function Index(props) {
    const {companies} = usePage().props;
    const [editForm ,setEditForm] = useState(null); 
    const [showForm ,setShowForm] = useState(null); 
    const [showBackButton, setBackButton] = useState(null); 
    const [showAddButton, setAddButton] = useState(true); 

    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
    });

const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
};

const storeItem = (e) => {
    e.preventDefault();
    setShowForm(false);
    post(route('companies.store'), {
        forceFormData: true        
    });
};

const addForm = (e)=>{
    e.preventDefault();
    setAddButton(false);
    setBackButton(true);
    setShowForm(true);
    setEditForm(false);
    setData({
        ...data
    });
 }

 const editItem = (e) =>{
    e.preventDefault();
    setAddButton(false);
    setBackButton(true);
    setEditForm(true);
    setShowForm(true);
    const uuid =  e.target.attributes.getNamedItem("data-key").value;

    if(uuid !==""){
        axios.get("/api/company-show/" + uuid)
        .then(res =>{
            setData({
                ...data, 
                name:res.data.name,
                company_code:res.data.company_code,
                contact_person:res.data.contact_person,
                contact_number:res.data.contact_number,
                contact_email:res.data.contact_email,
                contact_address:res.data.contact_address,
                company_tin:res.data.company_tin,
                company_bin:res.data.company_bin,
                uuid:res.data.uuid,
                
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}
const updateItem = (e)=>{
    e.preventDefault();
    setShowForm(false);
    Inertia.put(route('companies.update', data.uuid),data);
}


    if (!companies) return "No Series found!";

    return (
        <>
            <Authenticated auth={props.auth} errors={props.errors}>
                <Head title="Manage Company" />
                <PageTitle>Manage Company</PageTitle>
                { 
                showAddButton &&
                    <div className="float-right">
                        <Link onClick={addForm} className="bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border-purple-900 rounded w-24 mb-5 text-base float-right"> 
                            <i  className="fas fa-plus"></i> Add 
                        </Link>
                    </div>
                    
                }

                {
                    showBackButton && 
                    <div className="float-right">
                        <Link  href={route('companies.index')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded w-24 mb-5 text-base"> 
                            <i  className="fas fa-arrow-left"></i> Back 
                        </Link>
                    </div>
                    
                }
                

                {
                  showForm &&
                    <form onSubmit={editForm ? updateItem : storeItem }>
                        <div className="flex flex-row gap-3 mb-5">
                            <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="name" className="" value="Name" />

                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        autoComplete="title"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="company_code" className="" value="Company Code" />

                                    <Input
                                        type="text"
                                        name="company_code"
                                        value={data.company_code}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>

                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="contact_person" className="" value="Contact Person" />

                                    <Input
                                        type="text"
                                        name="contact_person"
                                        value={data.contact_person}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>    

                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="contact_number" className="" value="Contact Number" />

                                    <Input
                                        type="text"
                                        name="contact_number"
                                        value={data.contact_number}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>  

                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="contact_email" className="" value="Contact Email" />

                                    <Input
                                        type="email"
                                        name="contact_email"
                                        value={data.contact_email}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>    
                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="contact_address" className="" value="Address" />

                                    <Input
                                        type="text"
                                        name="contact_address"
                                        value={data.contact_address}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>  

                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="company_tin" className="" value="TIN Number" />

                                    <Input
                                        type="text"
                                        name="company_tin"
                                        value={data.company_tin}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}
                                        
                                    />
                                </div>  

                                <div className="grid gap-4 grid-cols-3">
                                    <Label forInput="company_bin" className="" value="Contact BIN" />

                                    <Input
                                        type="text"
                                        name="company_bin"
                                        value={data.company_bin}
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        handleChange={onHandleChange}                                       
                                    />
                                </div>                          

                                <div className="flex items-center mt-4">
                                   <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                                        { editForm ? "Update":"Save"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>                 
                }

                <div className="mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    
                    
                    <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8">
                        
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3">Id</th>
                                        <th className="px-4 py-3">Company Name</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                    {companies && companies.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3">
                                                {value.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {value.name}
                                            </td>

                                            <td className="px-4 py-3  text-right">
                                                <Link  onClick={editItem} data-key={value.uuid}   className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                                    <i  onClick={editItem} data-key={value.uuid} className="fas fa-pencil"></i>
                                                </Link>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </Authenticated>
        </>
    );
}
