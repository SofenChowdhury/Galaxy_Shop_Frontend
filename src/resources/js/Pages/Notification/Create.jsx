import React, { useEffect } from 'react';
import {Head, useForm, Link } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import PageTitle from "@/Components/PageTitle";
import { Textarea } from '@windmill/react-ui';


export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        heading: null,
        link: null,
        message: null,
        image_url: null,
        start_date: null,
        start_time: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        // return false;
        post(route('notifications.store'));
    };
    return (
        <>
        <Authenticated auth={props.auth} errors={props.errors}> 
            <Head title="Sliders" />
            <PageTitle>Sliders</PageTitle>
            <Link href={route('notifications.index')} className="w-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Notifications List
            </Link>
            
            <form onSubmit={submit}>
                <div className="flex flex-row gap-3 mb-5">
                    <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="">
                            <Label forInput="heading" className="" value="Notification Title" />

                            <Input
                                type="text"
                                name="heading"
                                value={data.heading}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="heading"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="slug" value="Link" />

                            <Input
                                type="text"
                                name="link"
                                value={data.link}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="link"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <Label forInput="message" value="Notification Details" />
                            <Textarea rows={7} value={data.message} name='message' className='block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input' onChange={onHandleChange} autoComplete="message"
                                >{data.message}
                            </Textarea>
                        </div>
                        <div className="mt-4">
                            <Label forInput="image" value="Notification Image" />
                            <Input
                                type="file"
                                name="image"
                                className="mt-1 block w-full"
                                // handleChange={onHandleChange}
                                handleChange={e => setData('image', e.target.files[0])}
                            />
                        </div>

                        
                    </div>
                    <div className="basis-1/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            
                        <div className="mt-4">
                            <Label forInput="start_date" value="Start Date & Times" />

                            <Input
                                type="date"
                                name="start_date"
                                value={data.start_date}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="start_date"
                                handleChange={onHandleChange}
                                required
                            />
                            <Input
                                type="time"
                                name="start_time"
                                value={data.start_time}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="start_time"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4">
                            <Button processing={processing}
                                className="bg-purple-500 text-white px-12 py-4 
                                    rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900  active:bg-red-500 transition-all hover:-translate-y-1">
                                Save Notification
                            </Button>
                        </div>                        
                    </div>
                </div>
            </form>
            
        </Authenticated>
    </>
    );
}
