/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "@inertiajs/inertia-react";
import Input from './Input';
import Button from './Button';
import ValidationErrors from './ValidationErrors';
export default function AdPaymentModal({title}, props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    id:"",
    name: ""
});

  return (
    
    <div>
      
      {/* <button className='bg-yellow-400 rounded-md p-2 text-cool-gray-100 float-left' onClick={() => setOpen(true)}>Add Payment</button> */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
          sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block align-bottom bg-white rounded-lg
                text-left 
              overflow-hidden shadow-xl 
              transform transition-all 
              md:my-12 md:align-middle md:max-w-lg md:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                      <ValidationErrors errors={errors} />
                        <form>
                            <div className="mb-4 grid grid-cols-4 gap-4">
                                <div className="flex flex-col">
                                    <label for="text" className="mb-2 font-semibold">Bank Name</label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value=""
                                        className="w-full max-w-lg rounded border border-slate-200 px-2 py-1 border-gray-300 dark:border-gray-600 
                                        dark:bg-gray-700 focus:border-purple-400 focus:outline-none 
                                        focus:shadow-outline-purple dark:text-gray-300 
                                        dark:focus:shadow-outline-gray form-input"
                                        required
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <Button className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded" >
                                        Save
                                    </Button>
                                    
                                </div>
                            </div>
                            
                            
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md
                    border border-transparent shadow-sm px-4 py-2 bg-red-600
                      text-base font-medium text-white hover:bg-red-700 
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center
                    rounded-md border border-gray-300 shadow-sm px-4 py-2
                    bg-white text-base font-medium text-gray-700
                      hover:bg-gray-50 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
                        sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>

    
  );
}