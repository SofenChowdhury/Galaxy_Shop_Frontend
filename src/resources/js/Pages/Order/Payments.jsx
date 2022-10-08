import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head, usePage, useForm } from "@inertiajs/inertia-react";
import PageTitle from "@/Components/PageTitle";

export default function Index(props) {

    const { payments } = usePage().props;
    

    if (!payments) return "No payment found!";
    return (
        <h1>Ahsan Ullah</h1>
    );
}
