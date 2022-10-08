import { Inertia } from '@inertiajs/inertia'
import React, {useState} from "react";
import {Link, Head, usePage, useForm} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Common/Pagination";
import PrefixSpecification from "@/Components/Common/PrefixSpecification";
import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";
import Authenticated from "@/Layouts/Authenticated";
import ValidationErrors from "@/Components/ValidationErrors";
export default function Pspecification(props) {
    const {id, prefixs,pspecifications} = usePage().props;
    const [editForm ,setEditForm] = useState(null); 
    const [showForm ,setShowForm] = useState(null); 
    const [checked, setChecked] = useState(false);
    const [inputList, setInputList] = useState([{ key: "" , value:"", prefix:""}])
    const { data, setData, post, progress } = useForm({
        trim_id:id
    })
    const storeItem = (e) => {
        e.preventDefault();
        Inertia.post(route('specification.store'),data);
    };
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const specifications = [...inputList];
        specifications[index][name] = value;
        setData({
            ...data,['specifications']:specifications
        });
      };

    //   console.log(inputList);
       
      const handleRemoveClick = index => {
        const specifications = [...inputList];
        specifications.splice(index, 1);
        setInputList(specifications);
      
      };
      const handleAddClick = () => {
        setInputList([...inputList, { key: "" , value:"", prefix:"" }]);
      
      }



    const addForm = (e)=>{
        e.preventDefault();
        setShowForm(true);
        setEditForm(false);
        setData({
            ...data, 
            id:"",
            prefix_id:"",
            key:"",
            prefix_name:"",
            value:"",
            status:"",
        });
     }

     const editItem = (e) =>{
        e.preventDefault();
        setEditForm(true);
        setShowForm(true);
        const id =  e.target.attributes.getNamedItem("data-key").value;
        if(id !==""){
            axios.get("/api/specification-edit/" + id)
            .then(res =>{
                console.log(res);
                setData({
                    ...data, 
                    id:res.data.id,
                    prefix_id:res.data.specification_prefix_id,
                    key:res.data.key,
                    prefix_name:res.data.specification_prefix.name,
                    value:res.data.value,
                    status:res.data.status,
                });
                if(res.data.status==1){
                    setChecked(true);
                }else{
                    setChecked(false);
                }
                
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const checkBox =(e)=>{

        if(e.target.checked){
            setChecked(true)
            setData({
                ...data, 
                status:1,
                
            });
        }else{
            setChecked(false);
            setData({
                ...data, 
                status:0,
                
            });
        }
       
     }

     const updateItem = (e)=>{
        e.preventDefault();
        Inertia.post(route('specification.update'),data,{
            forceFormData: true,
        });

        if(toaster !== null){
            Helper.alertMessage('success', toaster.message);
        }
        e.target.reset();
    }

    let back = function()
        {
            window.history.back();
        }

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Product Trim" />
            <PageTitle>Specification

               <Link onClick={back} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fas fa-chevron-left"></i> Back
                </Link>

            </PageTitle>
            <ValidationErrors errors={props.errors} />
             {showForm &&
                <form onSubmit={editForm ? updateItem : storeItem } >
                  <div className="basis-2/1 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    { editForm !=true? inputList.map((x, i) =>{
                        return (
                            <div style={{"textTransform":"capitalize"}} className="flex flex-row gap-3 items-center py-2" key={i}>
                                <div className="basis-1/4">
                                    <input
                                        type="text"
                                        placeholder="key"
                                        name="key"
                                        className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        value={x.key}
                                        onChange={e => handleInputChange(e, i)}
                                        required
                                    />
                                </div>
                                <div className="basis-1/4">
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        name="value"
                                        className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        value={x.value}
                                        onChange={e => handleInputChange(e, i)}
                                        required
                                    />
                                </div>
                                <div className="basis-1/4">
                                    <select 
                                        className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input" 
                                            name="prefix"
                                            value={x.prefix}
                                            onChange={e => handleInputChange(e, i)}
                                        >
                                        <option selected  >Select attribute</option> 
                                        { prefixs && prefixs.map((prefix , index)=>(
                                                <option value={prefix.name} key={index}>{prefix.name}</option>
                                            ))
                                        }
                                    </select>

                                </div>


                            <div className="flex">
                                {inputList.length !== 1 && <button className="mr10 bg-red text-red-800" onClick={() => handleRemoveClick(i)}><svg class="w-5 h-5 red-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                    </svg></button>}
                                    {inputList.length - 1 === i && <button 
                                    className="bg-green-500 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-lg hover:bg-success-900 transition-all hover:-translate-y-1" 
                                    onClick={handleAddClick}>+</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    <div style={{"textTransform":"capitalize"}} className="flex flex-row gap-3 items-center py-2">
                        <div className="basis-11/12">
                            <input
                                type="text"
                                placeholder="Key"
                                name="key"
                                className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                value={data.key}
                                onChange={e => setData('key', e.target.value)}
                                required
                            />
                        </div>

                        <div className="basis-11/12">
                            <input
                                type="text"
                                placeholder="Value"
                                name="value"
                                className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                value={data.value}
                                onChange={e => setData('value', e.target.value)}
                                required
                            />
                        </div>
                        <div className="basis-11/12">
                           <select 
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input" 
                                    name="prefix_name"
                                    value={data.prefix_name}
                                    onChange={e => setData( 'prefix_name',e.target.value)}
                                   
                                >
                                <option selected  >Select attribute</option> 
                                { prefixs && prefixs.map((prefix , index)=>(
                                        <option value={prefix.name} key={index}>{prefix.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="basis-11/12">
                            <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="status"
                                    checked={checked}
                                    onChange={checkBox}
                                /> Active/Inactive
                            </label>
                        </div>
                </div>
                   }


                    <div className="flex flex-row text-right mt-3">
                        <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                              { editForm ? "Update":"Save"}
                        </Button>
                    </div>
                  </div>
               </form>
             }

            <div className="w-full overflow-hidden rounded-lg shadow-xs mb-8 drop-shadow-lg mt-3">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">value</th>
                                <th className="px-4 py-3">Prefix</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            {pspecifications && pspecifications.data.map((value, index) => (
                                <PrefixSpecification key={index} prefix={value.name} specifications={value.specifications} add={addForm} edit={editItem} />
            
                             ))}
                        </tbody>
                    </table>
                </div>
                <Pagination links={pspecifications.links} />
            </div>






        </Authenticated>
    );
}
