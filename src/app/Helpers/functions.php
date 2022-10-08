<?php 

use Illuminate\Support\Str;
/*=================== array permutation ===================*/

if (! function_exists('array_permutation')) {
    function array_permutation($input)
    {
        $results = [];
        foreach ($input as $key=>$values){
            if (empty($values)) {
                    continue;
                }
            if(empty($results)){
                foreach($values as  $value){
                    $results[]=[$key=>$value];
                }
            }else{
                
                 $append = [];
                 foreach($results as &$result){
                    $collection = collect($values); 
                    $result[$key] = $collection->shift();

                    $copy = $result;

                    foreach ($values as $item) {
                       $copy[$key] = $item;
                       $append[] = $copy;
                    }
                 }
              
               $results =$append; 
            }
        }
        return $results;
    }

    /*================== sku_generate ==================*/

    if(! function_exists('sku_generate')){
        
        function sku_generate()
        {
            return  Str::random(3).substr(time(), 6,8).Str::random(3);
        }
    }




}
