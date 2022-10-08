import React, { useEffect,useState } from 'react';
import {Head, useForm, Link,usePage} from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import PageTitle from "@/Components/PageTitle";

export default function Create() {
    const {slider} = usePage().props;
    const [editForm ,setEditForm] = useState(slider?true:null); 
    const [showForm ,setShowForm] = useState(null); 
    const { data, setData, post,put, processing, errors, reset } = useForm({
        id: slider? slider.id:'',
        name: slider? slider.name:'',
        slug: slider? slider.slug:'',
        image: '',
        position: slider? slider.position:'',
        status: slider? slider.status:0
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const storeItem = (e) => {
        e.preventDefault();
        post(route('sliders.store'), {
            forceFormData: true
        });
    };

    const checkBox=(event)=> {  
        var isChecked = event.target.checked;  
        setData({...data, [event.target.name]:isChecked });  
  }  

  const updateItem = (e) => {
    e.preventDefault();
    post(route('sliders.update'),data,{
        forceFormData: true
    });
};



    let back = function()
    {
        window.history.back();
    }
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Sliders" />
            <PageTitle> Sliders 
                <Link onClick={back} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>
            </PageTitle>
            <form onSubmit={editForm ? updateItem : storeItem }>
                <div className="flex flex-row gap-3 mb-5">
                    <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="">
                            <Label forInput="name" className="" value="Slide Title" />
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
                        </div>

                        <div className="mt-4">
                            <Label forInput="slug" value="Link" />
                            <Input
                                type="text"
                                name="slug"
                                value={data.slug}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="slug"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <Label forInput="position" value="Position" />
                            <Input
                                type="number"
                                name="position"
                                value={data.position}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="position"
                                handleChange={onHandleChange}
                                
                            />
                        </div>
                        <div className="mt-4">
                            <Label forInput="image" value="Upload Slider Image" />
                            <Input
                                type="file"
                                name="image"
                                className="mt-1 block w-full mb-3"
                                handleChange={e => setData('image', e.target.files[0])}
                            />
                            {slider&& 
                                <img src={`/storage/sliders/${slider.image}`} width={100}/>
                            }
                        </div>
                        <div className="mt-4">
                           <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="status"
                                    checked={data.status}
                                    value={data.status}
                                    onChange={checkBox}
                                /> Active/Inactive
                            </label>
                        </div>

                        <div className="flex items-center mt-4">
                            <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                                { editForm ? "Update":"Save"}
                            </Button>
                           
                        </div>
                    </div>
                </div>
            </form>
            
        </Authenticated>
    );
}
