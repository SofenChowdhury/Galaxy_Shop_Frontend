import { Inertia } from '@inertiajs/inertia'
import React, {useState,useEffect } from "react";
import {Link, Head, usePage, useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";
import Authenticated from "@/Layouts/Authenticated";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Create(props) {
    const {id,product} =  usePage().props;
    const [tags, setTags] = useState([])
    const [sizes, setSize] = useState([])
    const [editForm ,setEditForm] = useState(product?true:null);
    const [inputFiled, setInputFiled] = useState([])
    const { data, setData, post, progress } = useForm()
    const [attribute, setAttribute] = useState([]);

    useEffect(() => {
        varitantproduct();
        setData(
           {...data, ['color']:tags, ['size']:sizes });
    },[tags,sizes]);

    const storeItem = (e) => {
        e.preventDefault();
        Inertia.post(route('attribute.store'),data);
    };

    const updateItem = (e)=>{
        e.preventDefault();
        Inertia.post(route('variant.update' ),data,{
            forceFormData: true,
        });
        if(toaster !== null){
            Helper.alertMessage('success', toaster.message);
        }
        e.target.reset();
    }

   const handleInputChange = ( index ,e) => {
        const { name, value } = e.target;
        const filed = [...inputFiled];
        filed[index][name] = value;
        setData({
             ...data , ['variants']:inputFiled
        })
    };

    const checkBox=(event)=> {  
        var isChecked = event.target.checked;  
        setData({...data, [event.target.name]:isChecked });  
    } 

    let back = function(){ 
        window.history.back()
    }

    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        if(!value.trim()){
         return  false;
        }else{
            if(name === 'size'){
                setSize([...sizes, value]);
                e.target.value = '';
            }else{
                setTags([...tags, value]);
                e.target.value = '';
            }
        }
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index));
    }
    function removeSize(index){
        setSize(sizes.filter((el, i) => i !== index));
    }

  const varitantproduct = () => {
        let filed = [];
        let attributeFiled = [];
        product  &&  product.varitant_prodcts.map((value , index)=>{
            filed[index]={
                id: value.id,
                sku: value.sku,
                regular_price: value.regular_price , 
                discount_price: value.discount_price,
                discount_start_date: value.discount_start_date,
                discount_end_date: value.discount_start_date,
                
            }
            value.variant_values.map((variant, key)=>{
                attributeFiled[key]={
                    name:variant.attribute_option.name
                };
            });

        });
        setInputFiled(...inputFiled, filed);
        setAttribute(...attribute, attributeFiled);
      
  }
  

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Create Product" />
            <PageTitle> { editForm ? "Edit":"Add"}
                <Link onClick={back} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>

            </PageTitle>
            <ValidationErrors errors={props.errors} />
            <form onSubmit={editForm ? updateItem : storeItem } >
                <div className="w-full overflow-hidden">
                    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                         {  editForm ==false ?      
                            <>
                                <div>
                                    <div className="grid grid-cols-2 grid-flow-col gap-4 mb-100">
                                        <div className='tags-input-container block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input'>
                                            { tags.map((tag, index) => (
                                                <div className="tag-item" key={index}>
                                                    <span className="text">{tag}</span>
                                                    <span className="close"  name="color" onClick={() => removeTag(index)}>&times;</span>
                                                </div>
                                            )) }
                                            <input
                                            onKeyDown={handleKeyDown} type="text"
                                            className="tags-input "
                                            name='color'
                                            placeholder="Type somthing" />

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="grid grid-cols-2 grid-flow-col gap-4 mb-100">
                                        <div className='tags-input-container block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input'>

                                            { sizes.map((size, index) => (
                                                <div className="tag-item" key={index}>
                                                    <span className="text">{size}</span>
                                                    <span className="close"  onClick={() => removeSize(index)}>&times;</span>
                                                </div>
                                            )) }
                                            <input
                                            onKeyDown={handleKeyDown} type="text"
                                            name='size'
                                            className="tags-input "
                                            placeholder="Type somthing" />
                                        </div>
                                    </div>
                                </div>
                            </>
                         :
                          product  &&  inputFiled.map((value,index ) =>(
                            <div className="grid grid-cols-2 grid-flow-col gap-4 mb-100" key={index}>
                                <div>
                                    <label class="block text-sm mb-3">
                                        <input
                                            type="text"
                                            name="sku"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            autoComplete="name"
                                            value={value.sku}
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                    </label>
                                </div>
                                <div className='flex'>
                                {  
                                    attribute && attribute.map((attribute , key)=>(
                                    <div key={key}>
                                        <label class="block text-sm mb-3">
                                            <input
                                                type="text"
                                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                                focus:shadow-outline-purple dark:text-gray-300 
                                                dark:focus:shadow-outline-gray form-input"
                                                value={attribute.name}
                                                disabled
                                            />
                                        </label>
                                    </div>
                                    ))
                                 }


                                </div>

                                <div>
                                    <label class="block text-sm mb-3">
                                        <input
                                            type="text"
                                            name="regular_price"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            placeholder='Reqular price'
                                            value={value.regular_price}
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                    </label>
                                </div>
                              
                                <div>
                                    <label class="block text-sm mb-3">
                                        <input
                                            type="text"
                                            name="discount_price"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            value={value.discount_price}
                                            onChange={e => handleInputChange(index, e)}
                                            placeholder='Discount Price'
                                            
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-sm mb-3">
                                        <input
                                            type="date"
                                            name="discount_start_time"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            placeholder='Discount Price'
                                        
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-sm mb-3">
                                        <input
                                            type="date"
                                            name="discount_end_time"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            placeholder='Discount Price'
                                            
                                        />
                                    </label>
                                </div>
                            </div>
                          ))
                         }
                    </div>
                </div>

                <div className="flex flex-row text-right mt-3">
                    <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                            { editForm ? "Update":"Save"}
                    </Button>
                </div>
            </form>

            { product &&
                <div className="w-full overflow-hidden rounded-lg by  mb-8 drop-shadow-lg mt-5">
                    <div className="w-full overflow-x-auto">
                       <table className="w-full whitespace-no-wrap">
                         <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                             <tr>
                                 <th className="px-4 py-3">Name</th>
                                 <th className="px-4 py-3">Thumbnail</th>
                                 <th className="px-4 py-3">attribute</th> 
                                 <th className="px-4 py-3">Price</th> 
                                 <th className="px-4 py-3">Status</th> 
                                 <th className="px-4 py-3 text-right">Action</th>
                             </tr>
                         </thead>
                         <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                               {
                                  product.varitant_prodcts.map((pvariant , index)=>(
                                     <tr key={index}>
                                         <td className="px-4 py-3">
                                             <p> {pvariant.title}</p>
                                             <p><span className="text-gray-600"> <b>slug :</b> {pvariant.slug}</span></p>
                                             <span className="text-gray-600"> <b>sku :</b> {pvariant.sku}</span>
                                         </td>
                                         <td className="px-4 py-3">
                                             <img src={`/storage/thumbnails/${pvariant.photo}`} width={100}/>
                                         </td>
                                         
                                         <td className="px-4 py-3"> 
 
                                            { pvariant.variant_values && pvariant.variant_values.map((variantName , key)=>(
                                                    <div>
                                                        <label class="block text-sm mb-3">
                                                        {variantName.attribute_option.name}
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                         </td>
                                         <td className="px-4 py-3">
                                               {pvariant.regular_price}
                                         </td>
                                         <td className="px-4 py-3">
                                             <span className={pvariant.status ? 'bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'
                                                 :'bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'}>
                                                 {pvariant.status ? "active"  :'Unactive'}
                                             </span>
                                         </td>
                                         <td className="px-4 py-3  text-right">
                                             <Link href={route('gallery.add' , pvariant.id)} className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded"> 
                                                 <i className="fas fa-plus"></i> Gallery
                                             </Link>
                                         </td>
                                      
                                     </tr>                                  
                                  ))
                               }
                         </tbody>
                     </table>
                   </div>
                </div>
            }
        </Authenticated>
    );
}
