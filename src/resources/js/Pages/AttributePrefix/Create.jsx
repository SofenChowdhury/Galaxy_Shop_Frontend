import React, { useEffect } from 'react';
import {Head, useForm, Link } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import Button from '@/Components/Button';
import Authenticated from '@/Layouts/Authenticated';
import PageTitle from "@/Components/PageTitle";


export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('prefix.store'), {
            forceFormData: true
        });
    };
    return (
        <>
        <Authenticated auth={props.auth} errors={props.errors}> 
            <Head title="Attribute Prefix" />
            <PageTitle>Attribute Prefix</PageTitle>
            <Link href={route('prefix.index')} className="w-32 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Prefix List
            </Link>
            
            <form onSubmit={submit}>
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

                        <div className="flex items-center mt-4">
                            <Button processing={processing}
                                className="bg-purple-500 text-white px-12 py-4 
                                    rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900  active:bg-red-500 transition-all hover:-translate-y-1">
                                Create Attribute Prefix
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            
        </Authenticated>
    </>
    );
}
