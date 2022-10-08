import {Link} from "@inertiajs/inertia-react";

const PrefixSpecification = ({prefix, specifications,add,edit }) => {
    return (
          <>
            {specifications && specifications.map((specification, index)=>(
                <tr>
                    <td className="px-4 py-3">{specification.key}</td>
                    <td className="px-4 py-3">{specification.value}</td>
                    <td className="px-4 py-3">{prefix}</td>
                    <td className="px-4 py-3">
                        {specification.status? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"> Active </span> : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"> Inactive </span>}
                    </td>
                     <td className="px-4 py-3 text-right">
                        <Link onClick={add}  className="bg-green-400 hover:bg-green-500 text-white py-2 mr-2 px-4 rounded">  <i  className="fas fa-plus"></i> Specification</Link>
                        <Link  onClick={edit} data-key={specification.id} className="btnInfo hover:btnInfo text-white py-2 mr-2 px-4 shadow-md rounded"> 
                            <i onClick={edit} data-key={specification.id} className="fas fa-pencil"></i>
                        </Link>
                    </td>
                    
                </tr>
            ))} 
         </>
    );
};
export default PrefixSpecification;
