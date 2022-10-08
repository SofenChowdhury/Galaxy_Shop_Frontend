import React, { useState } from "react";

import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);


    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 false">
            <Sidebar auth={auth.user} />
            <div class="flex flex-col flex-1 w-full">
                <Header auth={auth.user} />
                <main className="h-full pb-16 overflow-y-auto" style={{'background':"#f1f5f9"}}>
                    <div className="container mx-auto grid ">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
