import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";

export default function Login(props,{ status, canResetPassword }) {
    const { errors } = usePage().props
    const { data, setData, post, processing, reset} = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
     
        return () => {
            reset("password");
        };
    }, []);



    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };


    console.log(props);

    return (
        <>
            <Guest>
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <ValidationErrors errors={errors} />
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                </h1>
                <form onSubmit={submit}>
                    <div>
                        <Label forInput="email" value="Email" />

                        <Input
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border py-2 px-3"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="password" value="Password" />

                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border py-2 px-3"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                                className="focus:bg-purple-400 appearance-none checked:bg-purple-700"
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="block underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="mt-4">
                        <Button
                            className="mt-4 bg-purple-700 px-6 py-2"
                            processing={processing}
                        >
                            Log in
                        </Button>
                    </div>
                </form>
            </Guest>
        </>
    );
}
