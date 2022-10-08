<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            // 'customer_email' => ['required', 'string', 'email'],
            // 'customer_name' => ['required', 'string'],
            // 'customer_phone' => ['required', 'string'],
            // 'customer_address' => ['required', 'string'],
            // 'customer_city' => ['required', 'string'],
            // 'customer_thana' => ['required', 'string']
        ];
    }
}
