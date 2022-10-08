import React, { useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head, useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        image: '',
        status: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };
    return (
        <>
            <Head title="Create Admin" />
            <div className="p-5 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <ValidationErrors errors={errors} />
                <form onSubmit={submit}>
                <label class="block text-sm mb-3">
                    <span class="text-gray-700 dark:text-gray-400">Category Name</span>
                    
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
                    <span class="text-gray-700 dark:text-gray-400">Slug</span>
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
                </label>
                <label class="block text-sm mb-3">
                    <span class="text-gray-700 dark:text-gray-400">Status</span>
                    <select name='status' className='block w-full text-sm border rounded border-gray-300 dark:text-gray-300 focus:outline-none focus:border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:focus:border-gray-600 form-select leading-5 mt-1'>
                        <option value='1'>Active</option>
                        <option value='0'>Inactive</option>
                    </select>
                </label>
                <Button className="bg-purple-500 text-white px-8 py-2 
                    rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900 transition-all hover:-translate-y-1" processing={processing}>
                    Create
                </Button>
                </form>
            </div>
        </>
    );
}
