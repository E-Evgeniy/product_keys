import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams, NavLink } from 'react-router-dom';

import ClientKeysTable from "./client_keys_table"



const ClientKeys = () => {
    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [loadingClientKeys, setloadingClientKeys] = useState(true)
    const [searchParams] = useSearchParams();
    const [clientKeys, setClientKeys] = useState([])

    let client_id = useLocation().pathname.split('clients/')[1];
    client_id = client_id.split('/product_keys')[0];

    useEffect(() => {
        //Request on client keys

        const apiEndpoint = `/api/v1/client/product_keys?client_id=${client_id}&showKeys=${searchParams.get("showKeys")}`  

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {                
                setClientKeys(data["product_keys"])
                localStorage.setItem('loadingClientKeys', false);
            }
            );
    }, [loading])

    return (
        <div>        
            <main>
                <section>
                    <div className="bg-gray-100 sm:grid grid-cols-7 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
                        <div className="h-96 col-span-1 ">
                            <div className="bg-white  rounded-md">
                                <h1 className="text-center text-xl bg-white py-2 rounded-md border-b-2 text-gray-600 font-bold">{t('description.menu')}</h1>
                                <div className="bg-white rounded-md list-none  text-center ">                                                                        
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to={`/clients/${client_id}/product_keys/new`} className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.new_key')}</NavLink></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="/clients" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.clients')}</a></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="#" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">Отчёт об изменениях</a></li>
                                    <li className="py-3  hover:bg-indigo-200"><a href="#" className="list-none border-b-2 hover:text-indigo-900 hover:text-lg hover:font-bold">ВЫЙТИ!</a></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 bg-gradient-to-tr from-indigo-400 to-indigo-100 rounded-md h-100">

                        < ClientKeysTable show_keys={searchParams.get("showKeys")} client_id ={client_id}/>
    
                       
                        </div>
 
                        <h1>{localStorage.getItem('counter')}</h1>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

export default ClientKeys;