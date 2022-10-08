import { Inertia } from '@inertiajs/inertia'
import React, {useState} from "react";
import {Link, Head, usePage, useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import PageTitle from "@/Components/PageTitle";
import Authenticated from "@/Layouts/Authenticated";
import axios, * as others from 'axios';
import * as Helper from '../../Utilis/Helper';
import Swal from 'sweetalert2';

export default function (props) {

    const {id,galleries,errors,toaster,flash} = usePage().props;
    const [fileDataURL, setFileDataURL] = useState(null);
    const [editForm ,setEditForm] = useState(null);
    const { data, setData, post, progress } = useForm({
        image:null,
        color_code:null,
        product_id:id,
        gallery_id:null
    })

    const storeItem = async (e) =>  {
           e.preventDefault();
           await Inertia.post(route('gallery.store'),data,{
                forceFormData: true,
            })
            if(toaster !== null){
                Helper.alertMessage('success', toaster.message);
            }
            else{
                if(Object.keys(errors).length !== 0){
                    // console.log(errors.image)
                    Helper.alertMessage('error', errors.image);
                }
               
        }
        setData({
            ...data,
            image:null,
      })
    };

    
    const onChange= async (e)=> {
        setFileDataURL(true);
        let files = e.target.files || e.dataTransfer.files;
        if (files.length >0){
            uploadDocuments(e,files[0]);
        }
       
      }

    //   console.log(errors);

    // const createImage= (file) =>{

      
    //      setFileDataURL(true);
    //     let reader = new FileReader();
    //     reader.onload =  (e) => {
    //         setData({
    //         ...data,
    //         image: e.target.result,
            
    //       })
         
    //     };
    //      reader.readAsDataURL(file);

    //      setTimeout(() =>{
    //         console.log(data ,"inside file reader");
    //       },3000)
    //   }


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
            image:result,
      })
    }


    //  console.log(data);

 

    const editItem = (e) =>{
        e.preventDefault();
        setEditForm(true);
        const id =  e.target.attributes.getNamedItem("data-key").value;
        if(id !==""){
            axios.get("/api/gallery-edit/" + id)
            .then(res =>{
                setData({
                    ...data, 
                    color_code:null,
                    gallery_id:res.data.id,
                    image:res.data.image
                });
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const updateItem = (e)=>{
        e.preventDefault();
        Inertia.post(route('gallery.update'),data,{
            forceFormData: true,
        });

        if(toaster !== null){
            Helper.alertMessage('success', toaster.message);
        }
        e.target.reset();
    }


     const deleteItem = (e)=>{
        e.preventDefault();
        // setEditForm(true);
        const id =  e.target.attributes.getNamedItem("data-key").value;
        

         Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                Inertia.get(route('gallery.detele',id));

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
     }
    return (
        <Authenticated auth={props.auth} errors={
            props.errors}>
            <Head title="Product Trim" />
            <div className="flex justify-between mt-6  mb-6">
                <PageTitle>Gallery 
                    <Link href={route('products.index')} className="w-24 shadow-md	bg-green-500 add-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        <i className="fas fa-chevron-left"></i> Back
                    </Link>
                </PageTitle>
                <nav className="flex shadow-xs px-5 text-gray-700 bg-gray-50 rounded-lg  dark:bg-gray-800 by" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center">
                        <li className="inline-flex items-center">
                            <Link href={route('dashboard')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> Dashboard
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">Products</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            

            {/* <ValidationErrors errors={errors} /> */}

            <form onSubmit={editForm? updateItem : storeItem }  encType="multipart/form-data">
                <div className="basis-2/1 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div style={{"textTransform":"capitalize"}} className="flex flex-row gap-3 items-center py-2">
                        <div className="basis-3/5">
                            <input
                                type="file"
                                placeholder="key"
                                name="image"
                                className="block w-full text-sm border rounded border-gray-300 dark:border-gray-600 
                                dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                focus:shadow-outline-purple dark:text-gray-300 
                                dark:focus:shadow-outline-gray form-input"
                                onChange={onChange}
                                
                            />               
                        </div>
                        <div className="flex flex-row">
                            <Button  type='submit' className="bg-hyandai-500 text-white px-12 py-4 rounded-sm shadow-md hover:shadow-lg hover:bg-hyandai-900 transition-all hover:-translate-y-1" >
                                upload
                            </Button>
                        </div>
                    </div>
                    {fileDataURL == true &&  data.image !="" ?
                            <img src={data.image} width={100}/>
                            : editForm == true &&  data.image !="" ? <img src={`/storage/galleries/${data.image}`} width={100}/> :""
                    } 
                </div>
            </form>
             <div className="w-full overflow-hidden rounded-lg by  mb-8 drop-shadow-lg mt-5">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                            {galleries && galleries.map((value, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3">
                                        <img src={`/storage/galleries/${value.image}`} width={100}/>
                                    </td>

                                    <td className="px-4 py-3  text-right">
                                        <Link  href ="#"   className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                                            <i onClick={editItem} data-key={value.id} className="fas fa-eye"></i>
                                        </Link>
                                        <Link onClick={deleteItem} data-key={value.id} className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 shadow-md	rounded"> 
                                            <i onClick={deleteItem} data-key={value.id} className="fas fa-trash"></i>
                                         </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
}
