import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import ProductKeyForm from "./product_key_form"

const ProductKeyNew = () => {

    let client_id = useLocation().pathname.split('clients/')[1];
    client_id = client_id.split('/product_keys/new')[0];

    const { t } = useTranslation();

    const [loadedClient, setLoadedClient] = useState([])

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/v1/clients/" + client_id

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedClient(data["client"].name)
            }
            );
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
                            <div className="mb-5 block text-xl text-center font-medium text-[#07074D]">
                                {`${t('description.create_key_for_client')} ${loadedClient}`}
                            </div>
                            < ProductKeyForm client_id={client_id} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

export default ProductKeyNew;