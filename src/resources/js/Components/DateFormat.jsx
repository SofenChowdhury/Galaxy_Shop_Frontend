import React from 'react';
import { format } from 'date-fns';
export default function DateFormat({ date, dateFormat }) {

    const orderDate = format(new Date(date), dateFormat);
    return (
        <span> 
            &nbsp;{orderDate}
        </span>
        
    );
}
