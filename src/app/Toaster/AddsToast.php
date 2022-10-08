<?php
namespace App\Toaster;

use Illuminate\Http\Request;

trait AddsToast
{
    public static function  addToast(string $title, string $message, string $type, bool $alwaysShow=true)
    {
        $toast = [
            'title'      => $title,
            'message'    => $message,
            'type'       => $type,
            'alwaysShow' => $alwaysShow
        ];
      response()->json(request()->session()->flash('toaster', $toast));
    }
}