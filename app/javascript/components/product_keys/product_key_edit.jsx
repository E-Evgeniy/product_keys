import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import ProductKeyFormEdit from "./product_key_form_edit"
const ClientEdit = (props) => {

    const { t } = useTranslation();
    const [clientName, setClientName] = useState('')

    let client_id = useLocation().pathname.split('clients/')[1];
    client_id = client_id.split('/product_keys')[0];

    let product_key_id = useLocation().pathname.split('product_keys/')[1];
    product_key_id = product_key_id.split('/edit')[0];

    if (client_id == '0') {
        client_id = ''
    }

    

    useEffect(() => {
        //Load parametrs key

        if (client_id != '') {

           const apiEndpoint = `/api/v1/client/find_client_name?client_id=${client_id}`

           fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setClientName(data["client_name"])
            }
            );

        }

        
    }, [])

    const menuLeftTextClass = () => {
        return (
            'list-none  hover:text-indigo-900 hover:text-lg hover:font-bold'
        )
    }

    return (
        <div>
            <main>
                <section>
                    <div className="bg-gray-100 sm:grid grid-cols-7 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
                        <div className="h-96 col-span-1 ">
                            <div className="bg-white  rounded-md">
                                <h1 className="text-center text-xl bg-white py-2 rounded-md border-b-2 bg-indigo-100 text-gray-600 font-bold"> {t('description.menu')}</h1>
                                <div className="bg-white rounded-md list-none  text-center ">
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="/clients" className={menuLeftTextClass}> {t('description.clients')} </NavLink></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="/" className={menuLeftTextClass}> {t('description.main')} </NavLink></li>
                                    <li className="py-3  hover:bg-indigo-200"><a href="/api/v1/user/user_destroy_session" className="list-none border-b-2 hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.exit')}</a></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 rounded-md h-100">
                        < ProductKeyFormEdit product_key_id={product_key_id} client_id ={client_id} client_name={clientName} />
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default ClientEdit;