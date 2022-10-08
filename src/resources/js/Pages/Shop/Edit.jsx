import React, { useEffect,useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm,usePage } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import PageTitle from "@/Components/PageTitle";
import Checkbox from "@/Components/Checkbox";

export default function Create(props) {
    const {shop, companies, admins, divisions, districts, thanas} = usePage().props;
    const [editForm, setEditForm] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id:shop.id,
        title: shop.title,
        dms_code: shop.dms_code,
        contact_person: shop.contact_person,
        contact_number: shop.contact_number,
        contact_email: shop.contact_email,
        company_id: shop.company_id,
        status: shop.status,
        division_id: shop.division_id,
        district_id: shop.district_id,
        thana_id: shop.thana_id,
        admin_id: shop.admin_id
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
                <Link onClick={back} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>
            </PageTitle>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={updateItem}>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Shop Name
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
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            DMS Code
                        </span>
                        <Input
                            type="text"
                            name="dms_code"
                            value={data.dms_code}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Contact Person
                        </span>
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
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Contact Number
                        </span>
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
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Contact Email
                        </span>
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
                    </label>
                     
                     <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
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
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Shop Admin
                        </span>
                        <select  onChange={statusCheckBox} value={data.admin_id}  name="admin_id" id="admin_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Admin</option>
                                    {admins && admins.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>                    
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Select Division
                        </span>
                        <select  onChange={statusCheckBox} value={data.division_id}  name="division_id" id="division_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Division</option>
                                    {divisions && divisions.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Select District
                        </span>
                        <select  onChange={statusCheckBox} value={data.district_id}  name="district_id" id="district_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select District</option>
                                    {districts && districts.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Select Thana
                        </span>
                        <select  onChange={statusCheckBox} value={data.thana_id}  name="thana_id" id="thana_id" className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input">
                                    <option value="">Select Thana</option>
                                    {thanas && thanas.map((value, index) => (
                                        <option value={value.id}>{value.name}</option>
                                    ))}

                        </select>
                    </label>
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
                            {"Update"}
                        </Button>
                        
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
