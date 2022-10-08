import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";

import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";

export default function Create() {
    return (
        <>
            <Head title="Create Product" />
            <PageTitle>Create Product</PageTitle>
            <div className="flex flex-row gap-3 mb-5">
                <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <form>
                        <label class="block text-sm mb-3">
                            <span class="text-gray-700 dark:text-gray-400">
                                Product Title
                            </span>

                            <Input
                                type="text"
                                name="name"
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="name"
                                required
                            />
                        </label>
                        <label class="block text-sm mb-3">
                            <span>Short Description</span>
                            <textarea
                                class="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                rows="3"
                            ></textarea>
                        </label>

                        <label class="block text-sm mb-3">
                            <span>Description</span>
                            <textarea
                                class="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                rows="5"
                            ></textarea>
                        </label>
                        <label class="block text-sm mb-3">
                            <span>Color & price</span>
                        </label>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="basis-1/3">
                                <Input
                                    type="text"
                                    placeholder="Enter color"
                                    name="name"
                                    className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <div className="basis-1/3">
                                <Input
                                    type="text"
                                    name="name"
                                    className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input"
                                    autoComplete="name"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="basis-1/3">
                                <Button
                                    className="bg-purple-500 text-white px-6 py-2
                                        rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900 transition-all hover:-translate-y-1"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="basis-1/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <Input
                        type="file"
                        name="image"
                        className="custom-form-file-input block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input mb-3"
                        autoComplete="name"
                        required
                    />
                    <label class="block text-sm mb-3">
                        <span>Product Category</span>
                        <select
                            class="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                        >
                            <option>SUV</option>
                            <option>Sedan</option>
                            <option>Sports</option>
                            <option>Economy</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="flex flex-row">
                <Button
                    className="bg-purple-500 text-white px-12 py-4 
                        rounded-sm shadow-sm hover:shadow-lg hover:bg-purple-900 transition-all hover:-translate-y-1"
                >
                    Create Product
                </Button>
            </div>
        </>
    );
}
