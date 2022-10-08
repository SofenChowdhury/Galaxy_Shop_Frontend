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
        code: null,
        coupon_type: null,
        price_value: null,
        max_usable: null,
        min_cart_value: null,
        times: null,
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        note: null

    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('coupons.store'), {
            forceFormData: true
        });
    };
    return (
        <>
        <Authenticated auth={props.auth} errors={props.errors}> 
            <Head title="Coupons" />
            <PageTitle>Coupons</PageTitle>
            <Link href={route('coupons.index')} className="w-32 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Coupon List
            </Link>
            
            <form onSubmit={submit}>
                <div className="flex flex-row gap-3 mb-5">
                    <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="">
                            <Label forInput="code" className="" value="Coupon Code" />

                            <Input
                                type="text"
                                name="code"
                                value={data.code}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="code"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="type" value="Type (Percentage / Amount)" />

                            <select onChange={onHandleChange} name='coupon_type' className='block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input'>
                                <option value="">Select Type</option>
                                <option value={10}>Percentage</option>
                                <option value={11}>Amount</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <Label forInput="price_value" value="Price / Percentage" />

                            <Input
                                type="number"
                                name="price_value"
                                value={data.price_value}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="price_value"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <Label forInput="max_usable" value="Maximum Usable on Percentage" />

                            <Input
                                type="number"
                                name="max_usable"
                                value={data.max_usable}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="max_usable"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="min_cart_value" value="Minimum Cart Value" />

                            <Input
                                type="number"
                                name="min_cart_value"
                                value={data.min_cart_value}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="min_cart_value"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="times" value="Usable Times" />

                            <Input
                                type="number"
                                name="times"
                                value={data.times}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="times"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        

                        <div className="mt-4">
                            <Label forInput="note" value="Note" />

                            <Input
                                type="text"
                                name="note"
                                value={data.note}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="note"
                                handleChange={onHandleChange}
                                required
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

                        <div className="mt-4">
                            <Label forInput="end_date" value="End Date & Times" />

                            <Input
                                type="date"
                                name="end_date"
                                value={data.end_date}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input basis-1/3"
                                autoComplete="end_date"
                                handleChange={onHandleChange}
                                required
                            />
                            <Input
                                type="time"
                                name="end_time"
                                value={data.end_time}
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="end_time"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4">
                            <Button processing={processing}
                                className="bg-purple-500 text-white px-12 py-4 
                                    rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900  active:bg-red-500 transition-all hover:-translate-y-1">
                                Create Coupons
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            
        </Authenticated>
    </>
    );
}
