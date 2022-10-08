<?php
namespace App\Classes;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FileUpload
{

    public function uploadFile($request, $fieldname, $file, $folder)
     {
        
        if ($request->hasFile($fieldname)) {
            $source = $request->file($fieldname);
            $image_name = Str::uuid().".".$source->getClientOriginalExtension();

            if ($file != "") {               
                
                if (Storage::disk("public")->exists($folder . '/' . $file)) {
                   
                    Storage::disk("public")->delete($folder . '/' . $file);
                }
            }
           $source->storeAs('public/'.$folder, $image_name);
        
           return  $image_name;
        }
     }

    
    public function base64ImgUpload($requesFile,$file,$folder)
    {
        $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '',$requesFile));
        $imageName = "FTL"."-".Str::random(10).'.webp';

        if ($file != "") {
               
            if (Storage::disk("local")->exists("public/".$folder . '/' . $file)) {
                Storage::disk("local")->delete("public/".$folder . '/' . $file);
            }
        }

        Storage::disk('local')->put('public/'.$folder.'/' . $imageName, $image); 
        
        return  $imageName;
    }

     public function fileDelete($folder,$file)
     {
        if (Storage::disk("local")->exists('public/'.$folder.'/' .$file)) {
            Storage::disk("local")->delete('public/'.$folder.'/'  .$file);
        }
        return true;
     }
     
}
 