import { Inertia } from '@inertiajs/inertia'
import React, {useState} from "react";
import {Link, Head, usePage, useForm} from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";
import Authenticated from "@/Layouts/Authenticated";
import ValidationErrors from "@/Components/ValidationErrors";
export default function Create(props) {
    const {categories ,product,series} = usePage().props;
    const [fileDataURL, setFileDataURL] = useState(null);
    const [editForm ,setEditForm] = useState(product?true:null);
    const [checked, setChecked] = useState(false);
    const [ToggleState, setToggleState] = useState(1);

    const { data, setData, post, progress } = useForm({
        product_id: product? product.id:null,
        title: product? product.title:null,
        sku: random,
        stock:product? product.stock:null,
        max_order_qty:product? product.max_order_qty:null,
        specifications:product? product.specifications:null,
        details:product? product.details:null,
        thumbnail:null,
        regular_price:product? product.regular_price:null,
        discount_price:product? product.discount_price:null,
        discount_start_time:product? product.discount_start_time:null,
        discount_end_time:product? product.discount_end_time:null,
        category_name:product? product.category.name:null,
        series_name:product? product.series.title:null,
        status:product? product.status:0,
        featured:product? product.featured:0,
        best:product? product.best:0,
        top:product? product.top:0,
    
        
      })
     
    const string_length = 10;
    let random= [...Array(string_length)].map(i=>( ~~(Math.random()*36)
          ).toString(36)).join('');
    let onHandleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]:e.target.value
        })
   }


 

const onChange= async (e)=> {
    setFileDataURL(true);
    let files = e.target.files || e.dataTransfer.files;
    if (files.length >0){
        uploadDocuments(e,files[0]);
    }
   
  }

  const uploadDocuments = async (event, file) => {
   
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const response = await submitFile(
              reader.result,
              file.name,
            );
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
  };



  const submitFile = (result,name)=>{
    setData({
        ...data,
        thumbnail:result,
  })
}
   
    const storeItem = (e) => {
        e.preventDefault();
        Inertia.post(route('products.store'),data,{
            forceFormData: true,
        });
    };
   
    const updateItem = (e)=>{
        console.log(data);
        e.preventDefault();
        Inertia.post(route('product.update' ),data,{
            forceFormData: true,
        });

        if(toaster !== null){
            Helper.alertMessage('success', toaster.message);
        }
        e.target.reset();
    }


     const checkBox=(event)=> {  
        var isChecked = event.target.checked;  
        setData({...data, [event.target.name]:isChecked });  
    }  

    let image=fileDataURL == true &&  data.thumbnail !="" ?data.thumbnail : editForm == true &&  data.thumbnail !="" ? `/storage/thumbnails/${product.photo}` :"";

    const myStyle={
        backgroundImage:'url(' + image + ')',
        height:'38%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    let back = function(){ 
        window.history.back()
    }

    const toggleTab = (index) => {
        console.log(index);
        setToggleState(index);
      };
    
    
      const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";
    

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
                <div className="flex flex-row gap-3 mb-5">
                    <div className="basis-2/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="grid grid-cols-2 grid-flow-col gap-4 mb-100">
                                <div>
                                    <label class="block text-sm mb-3">
                                        <span class="text-gray-700 dark:text-gray-400">Title</span>
                                        <input
                                            type="text"
                                            name="title"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            autoComplete="name"
                                            value={data.title?data.title:""}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label class="block text-sm mb-3">
                                        <span class="text-gray-700 dark:text-gray-400">Sku</span>
                                        <input
                                            type="text"
                                            name="sku"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            value={random}
                                            onChange={e => setData('sku', e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 grid-flow-col gap-4">
                                <div>
                                    <label class="block text-sm mb-3">
                                        <span class="text-gray-700 dark:text-gray-400"> Series Name</span>
                                        
                                        <select 
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                                focus:shadow-outline-purple dark:text-gray-300 
                                                dark:focus:shadow-outline-gray form-input" 
                                                name="series_name"
                                                value={data.series_name}
                                                onChange={e => setData('series_name', e.target.value)}
                                                required
                                            >
                                            <option selected>Select Series</option> 
                                                {  series &&  
                                                series.map((value , index)=>(
                                                <option value={value.title} key={index}>{value.title}</option>
                                                ))
                                            }  
                                        </select>


                                    </label>

                                </div>

                                <div>

                                   <span>Product Category</span>
                                  

                                        <select 
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                                focus:shadow-outline-purple dark:text-gray-300 
                                                dark:focus:shadow-outline-gray form-input" 
                                                name="category_name"
                                                value={data.category_name}
                                                onChange={e => setData('category_name', e.target.value)}
                                                required
                                            >
                                            <option selected>Select Category</option> 
                                            { categories && categories.map((category , index)=>(
                                                <option value={category.name} key={index}>{category.name}</option>
                                                ))
                                            }
                                        </select>
                                    
                                </div>

                                
                            </div>


                            <div className="grid grid-cols-2 grid-flow-col gap-4">
                               
                                <div>
                                    <label class="block text-sm mb-3">
                                    <span class="text-gray-700 dark:text-gray-400"> Stock</span>
                                        <input  
                                            type="text"
                                            name="stock"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            autoComplete="stock"
                                            value={data.stock}
                                            onChange={e => setData('stock', e.target.value)}
                                            required
                                            
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label class="block text-sm mb-3">
                                    <span class="text-gray-700 dark:text-gray-400"> Max order Quantity</span>
                                        <input  
                                            type="text"
                                            name="max_order_qty"
                                            className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                            dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                            focus:shadow-outline-purple dark:text-gray-300 
                                            dark:focus:shadow-outline-gray form-input"
                                            value={data.max_order_qty}
                                            onChange={e => setData('max_order_qty', e.target.value)}
                                            required
                                            
                                        />
                                    </label>
                                </div>
                            </div>
                            <label class="block text-sm mb-3">
                                <span>Short Description</span>
                                {/* <Editor
                                   
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    onChange={editorState => setFormData(editorState)}
                                   
        
                                />                        */}

                                <textarea
                                    class="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input"
                                    rows="5"
                                    name="specifications"
                                    value={data.specifications}
                                    onChange={e => setData('specifications', e.target.value)}
                                    required
                                >

                                </textarea>

                            </label>
                            <label class="block text-sm mb-3">
                                <span>Description</span>
                                <textarea
                                    class="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                    dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                    focus:shadow-outline-purple dark:text-gray-300 
                                    dark:focus:shadow-outline-gray form-input"
                                    rows="5"
                                    name="details"
                                    value={data.details}
                                    onChange={e => setData('details', e.target.value)}
                                    required
                                >

                                </textarea>
                            </label>

                            <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="featured"
                                    checked={data.featured}
                                    value={data.featured}
                                    onChange={checkBox}
                                /> Featured
                            </label>
                            <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="best"
                                    checked={data.best}
                                    value={data.best}
                                    onChange={checkBox}
                                /> Best
                            </label>
                            <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="top"
                                    checked={data.top}
                                    value={data.top}
                                    onChange={checkBox}
                                /> Top
                            </label>
                            <label class="block text-sm mb-3">
                                <input type="checkbox"
                                    name="status"
                                    checked={data.status}
                                    onChange={checkBox}
                                    value={data.status}
                                /> Active/Inactive
                            </label>

                    </div>

                    <div className="basis-1/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <input
                            type="file"
                            name="thumbnail"
                            className=" block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input mb-3"
                                onChange={onChange}
                                style={myStyle}
                        />

                           <label class="block text-sm mb-3">
                            <span class="text-gray-700 dark:text-gray-400"> Regular Price</span>
                            <input  
                                type="text"
                                name="regular_price"
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="regular_price"
                                value={data.regular_price}
                                onChange={e => setData('regular_price', e.target.value)}
                                required
                              
                            />
                        </label>
                        <label class="block text-sm mb-3">
                            <span class="text-gray-700 dark:text-gray-400"> Discount Price</span>
                            <input  
                                type="text"
                                name="discount_price"
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                autoComplete="discount_price"
                                value={data.discount_price}
                                onChange={e => setData('discount_price', e.target.value)}
                                
                            />
                        </label>
                        <label class="block text-sm mb-3">
                            <span class="text-gray-700 dark:text-gray-400"> Discount Start Date</span>
                            <input  
                                type="datetime-local"
                                name="discount_start_time"
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                value={data.discount_start_time}
                                onChange={e => setData('discount_start_time', e.target.value)}
                                
                            />
                        </label>
                        <label class="block text-sm mb-3">
                            <span class="text-gray-700 dark:text-gray-400"> Discount End Date</span>
                            <input  
                                type="datetime-local"
                                name="discount_end_time"
                                className="block w-full mt-1 text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                value={data.discount_end_time}
                                onChange={e => setData('discount_end_time', e.target.value)}
                            />
                        </label>

                        <br />
                    </div>
                </div>
                <div className="flex flex-row text-right mt-3">
                    <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                            { editForm ? "Update":"Save"}
                    </Button>
                </div>
            </form>


            
        {/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li 
                   className="mr-2"
                   role="presentation"
                   onClick={() => toggleTab(1)}
                >
                    <button  className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 ${getActiveClass(1, "inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500")}`}   id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                </li>
                <li className="mr-2" role="presentation"
                 onClick={() => toggleTab(2)}
                >
                    <button  className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 ${getActiveClass(2, "inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500")}`}  id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">Dashboard</button>
                </li>
                <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                </li>
                <li role="presentation">
                    <button className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Contacts</button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div
            className={getActiveClass(1, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") ? getActiveClass(1, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") : 'hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'}
            id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
            </div>
            <div 
                className={getActiveClass(2, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") ? getActiveClass(1, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") : 'hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'}
                id="dashboard" 
                role="tabpanel" 
                aria-labelledby="dashboard-tab">
                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
            </div>
            <div 
                  className={getActiveClass(3, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") ? getActiveClass(3, "p-4 bg-gray-50 rounded-lg dark:bg-gray-800") : 'hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'}
            
                 id="settings" role="tabpanel" aria-labelledby="settings-tab">
                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
            </div>
            <div className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
            </div>
        </div> */}













        </Authenticated>
    );
}
