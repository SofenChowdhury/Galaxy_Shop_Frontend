import React from "react";
import { Card, CardBody } from "@windmill/react-ui";

export default function InfoCard({ title, value, children: icon }) {
    return (
        <Card className="bg-white shadow-xl">
            <CardBody className="flex items-center">
                {icon}
                <div className="ml-5">
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {value}
                    </p>
                </div>
            </CardBody>
        </Card>
    );
}
