import React, { useEffect,useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, useForm,usePage } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import PageTitle from "@/Components/PageTitle";
import { Textarea } from "@windmill/react-ui";
import Checkbox from "@/Components/Checkbox";

export default function Create(props) {
    const {permission, roles} = usePage().props;
    const [editForm ,setEditForm] = useState(permission?true:null); 
    const [showForm ,setShowForm] = useState(null); 
    // const [selectedRoles, setInputList] = useState([{ roles: "" }])
    const { data, setData, post, processing, errors, reset } = useForm({
        id:permission?permission.id: "",
        name:permission?permission.name: "",
        key:permission?permission.key: "",
        description:permission?permission.description: "",
        admin_roles:[]
    });   

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleChecked = (e) => {
        let id = e.target.value;
            if (e.target.checked) {
                setData("admin_roles", [...data.admin_roles, id]);
            } else {
                setData(
                    "admin_roles",
                    data.admin_roles.filter((item) => {
                        return item !== id;
                    })
                );
            }
    };

    const storeItem = (e) => {
        e.preventDefault();
        post(route("permissions.store"));
    };


    const updateItem = (e) => {
        e.preventDefault();
        post(route('permissions.update'),data,{
            forceFormData: true
        });
    };

   let back = function()
    {
        window.history.back();
    }


    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Permission" />
            <PageTitle> Permission </PageTitle>
            <Link  onClick={back} className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-700 rounded w-24 mb-5 text-base"> 
                <i className="fas fa-chevron-left"></i> Back
            </Link>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={editForm ? updateItem : storeItem }>
                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Permission Title
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
                            Permission Key
                        </span>
                        <Input
                            type="text"
                            name="key"
                            value={data.key}
                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="key"
                            handleChange={onHandleChange}
                            required
                        />
                    </label>

                    <label class="block text-sm mb-3">
                        <span class="text-gray-700 dark:text-gray-400">
                            Description
                        </span>
                        <textarea name="description" 
                        handleChange={onHandleChange}
                         value={data.description} 
                         onChange={e => setData('description', e.target.value)}
                         className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                            focus:shadow-outline-purple dark:text-gray-300 
                            dark:focus:shadow-outline-gray form-input"
                            autoComplete="description"
                         id="description" cols="10" rows="3">
                        
                        </textarea>
                    </label>

                    <div className="flex items-center mt-4">
                        <span className="mr-1">Roles </span>
                        {roles && roles.map((value, index) => (
                            <label className="flex items-center" key={index}>
                            <Checkbox name="admin_roles[]" id={`role${value.id}`} value={value.id} handleChange={handleChecked} />
                                    <span className="ml-2 text-sm text-indigo-600">
                                            {value.name}
                                    </span>
                            </label>
                        ))}
                        
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
