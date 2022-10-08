import { Link,usePage,useForm } from "@inertiajs/inertia-react";
import React,{useState} from "react";
function SidebarContent() {
    const { url, component } = usePage();
    const [isActive, setActive] = useState(false);
    const { data, setData} = useForm({
         urlLInk:url
    })

 
    
    const ToggleClass = (e) => {
        e.preventDefault();
        const value = e.target.attributes.getNamedItem("data-url").value;
        setActive(!isActive);
        setData({
            ...data,
            urlLInk:value
        })
    };   
    return (
    <div className="py-4 text-gray-500 dark:text-gray-400">

        <div className='logo w-4/5 mx-auto'>
            <Link href={route('dashboard')} 
                    className="text-2xl font-bold text-gray-800 dark:text-gray-200" > 
                <img src={`/storage/logo/fel-b2b.png`}/>
            </Link>
        </div>
            <div className="sidebar-menu">
            <ul className="mt-6">
                <li 
                className={
                    data.urlLInk =='/'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' : 
                    'relative px-6 py-3'
                }
                data-url="/"
                onClick={ToggleClass}
                >
                    <Link href={route('dashboard')}
                        className={
                            data.urlLInk =='/'? ' inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 sidebar-dropdown-link-active' 
                            : 'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150'
                        }
                        >
                        <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        <span className="ml-4"
                        data-url="/"
                    
                        >Dashboard</span>
                    </Link>
                </li>
                
                <li  className={ data.urlLInk =='/admin/orders'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        // href="/admin/orders"
                        href={route('orders.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                    >
                    <i className="fas fa-shopping-cart"></i>
                        <span className="ml-4">Orders</span>
                    </Link>
                </li>  
                <li className="sidebar-dropdown">
                    <a className={ data.urlLInk ==='/admin/products' || data.urlLInk==='/admin/products/create' ? 'sidebar-dropdown-link sidebar-dropdown-link-active':'sidebar-dropdown-link'}
                            data-url="/admin/products"
                            onClick={ToggleClass}
                    >
                        <i className="sidebar-menu-icon fas fa-box-open" />
                        <i className="sidebar-dropdown-right-icon fas fa-angle-right"></i>
                        <span
                        data-url="/admin/products"
                        onClick={ToggleClass}
                        >Product</span>
                        
                    </a>
                    <div  className={data.urlLInk ==='/admin/products' && isActive? "block":"sidebar-submenu" }>
                        <ul className="sidebar-submenu-ul">
                            <li className="sidebar-submenu-li"> 
                                <Link href={route('products.index')} 
                                    className={ url ==='/admin/products' ? "sidebar-menu-link link-active inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" : "sidebar-menu-link inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"} >
                                    <i className="fas fa-box-open" />
                                    <span className="ml-4">Products</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>                

                <li  className={ data.urlLInk =='/admin/categories'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        // href="/admin/orders"
                        href={route('categories.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors"
                    >
                    <i className="fas fa-shopping-cart"></i>
                        <span className="ml-4">Category</span>
                    </Link>
                </li>

                <li  className={ data.urlLInk =='/admin/series'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        // href="/admin/orders"
                        href={route('series.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors"
                    >
                    <i className="fas fa-shopping-cart"></i>
                        <span className="ml-4">Series</span>
                    </Link>
                </li>

                <li className={ data.urlLInk =='/admin/companies'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        // href="/admin/orders"
                        href={route('companies.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                    >
                    <i className="fa fa-store"></i>
                        <span className="ml-4">Company</span>
                    </Link>
                </li>

                <li className={ data.urlLInk =='/admin/shops'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        href={route('shops.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                    >
                    <i className="fa fa-store"></i>
                        <span className="ml-4">Shops</span>
                    </Link>
                </li>

                <li className={ data.urlLInk =='/admin/customers'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                    <Link
                        href={route('customers.index')}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200"
                    >
                        <i className="fa fa-user"></i> 
                        <span className="ml-4">Customers</span>
                    </Link>
                </li>

                <li className={ data.urlLInk =='/admin/admins'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                        <Link
                            href={route('admins.index')}
                    
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors">
                                <i className="fas fa-users"></i> 
                                <span className="ml-4">Manage User</span>
                        </Link>
                    
                    </li>
                    <li className={ data.urlLInk =='/admin/roles'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                        <Link
                            href={route('roles.index')}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors"
                        >
                        
                                <i class="fas fa-gear"></i>
                                <span className="ml-4">Manage Role</span>
                            </Link>
                    </li>
                  
                   
                    <li className={ data.urlLInk =='/admin/permissions'  ? 'relative px-6 py-3 sidebar-dropdown-link-active' :  'relative px-6 py-3'}>
                        <Link
                            href={route('permissions.index')}
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors"
                        >
                            <i className="fas fa-cogs"></i>
                            <span className="ml-4">Manage Permissions</span>
                        </Link>
                    </li>

            </ul>
        </div>
    </div>
    );
}

export default SidebarContent;
