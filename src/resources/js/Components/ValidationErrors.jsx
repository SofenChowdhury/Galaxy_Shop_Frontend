import React from 'react';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p class="font-bold">Whoops!</p>
                {Object.keys(errors).map(function (key, index) {
                    return <p key={index}>{errors[key]}</p>
                })}
            </div>
            
        )
    );
}
