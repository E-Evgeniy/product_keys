import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ClientTable from "./client_table"
import React, { useState, useEffect } from "react";


const Client = () => {
    const { t } = useTranslation();
    const [getFreeKey, setGetFreeKey] = useState('0')
    let location = useLocation().pathname.split('clients/')[1];


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/product_key/free_key`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setGetFreeKey(data["rezult"])
            }
            );
    }, [])

    let showGetFreeKey = "invisible py-3 border-b-2  hover:bg-indigo-200"

    if (getFreeKey != '0') {
        showGetFreeKey = "py-3 border-b-2  hover:bg-indigo-200"
    }

    return (
        <div>        
            <main>
                <section>
                    <div className="bg-gray-100 sm:grid grid-cols-7 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
                        <div className="h-96 col-span-1 ">
                            <div className="bg-white  rounded-md">
                                <h1 className="text-center text-xl bg-white py-2 rounded-md border-b-2 text-gray-600 font-bold">{t('description.menu')}</h1>
                                <div className="bg-white rounded-md list-none  text-center ">                                                                        
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href={`${location}/product_keys/new`} className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.new_key')}</a></li>
                                    <li className={showGetFreeKey}><a href={`/clients/${location}/product_keys/${getFreeKey}/edit?loc=/clients/${location}`} className=" list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.get_free_key')}</a></li>
                                    <li className="py-3  hover:bg-indigo-200"><a href="/api/v1/user/user_destroy_session" className="list-none border-b-2 hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.exit')}</a></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 bg-gradient-to-tr from-indigo-400 to-indigo-100 rounded-md h-100">

                            <ClientTable />                        

                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

export default Client;