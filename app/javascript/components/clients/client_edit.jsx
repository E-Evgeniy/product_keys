import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ClientFormEdit from "./client_form_edit"
const ClientEdit = () => {

    const { t } = useTranslation();

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
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="#" className={menuLeftTextClass}> {t('description.exit')} </NavLink></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 rounded-md h-100">
                        <ClientFormEdit />
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default ClientEdit;