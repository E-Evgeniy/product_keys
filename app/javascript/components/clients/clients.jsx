import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ClientsTable from "./clients_table"
import Pagination from "../pagination";


export default function Clients() {
    const [findName, setFindName] = useState('')
    const [findEmail, setFindEmail] = useState('')
    const [findComment, setFindComment] = useState('')
    const [searchFileld, setSearchFileld] = useState('')
    const [loadedClients, setLoadedClients] = useState([])
    const [loading, setloading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(5)

    const { t } = useTranslation();

    const onChangeName = (e) => {
        setFindName(e.target.value);
        setSearchFileld(e.target.value);
    }

    const onChangeEmail = (e) => {
        setFindEmail(e.target.value);
        setSearchFileld(e.target.value);
    }

    const onChangeComment = (e) => {
        setFindComment(e.target.value);
        setSearchFileld(e.target.value);
    }

    useEffect(() => {
        //Get clients

        const apiEndpoint = `/api/v1/clients?findName=${findName}&findEmail=${findEmail}&findComment=${findComment}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedClients(data["clients"])
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const menuLeftTextClass = () => {
        return (
            'list-none  hover:text-indigo-900 hover:text-lg hover:font-bold'
        )
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedClients.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div>
            <main>
                <section>
                    <div className="bg-gray-100 sm:grid grid-cols-7 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
                        <div className="h-96 col-span-1 ">
                            <div className="bg-white  rounded-md">
                                <h1 className="text-center text-xl bg-white py-2 rounded-md border-b-2 bg-indigo-100 text-gray-600 font-bold"> {t('description.menu')}</h1>
                                <div className="bg-white rounded-md list-none  text-center ">
                                    <li className="py-3 border-b-2  hover:bg-green-500"><NavLink to="/clients/new" className={menuLeftTextClass}> {t('description.new_client')} </NavLink></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="/" className={menuLeftTextClass}> {t('description.main')} </NavLink></li>                                    
                                    <li className="py-3  hover:bg-indigo-200"><a href="/api/v1/user/user_destroy_session" className="list-none border-b-2 hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.exit')}</a></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 rounded-md h-100">
                        <div className="items-center">
                    <h2 className="me-2 text-2xl text-gray-900 font-semibold text-center">{t('description.clients')}</h2>
                    <br></br>
                </div>

                <div className=" flex items-center justify-between pb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[#07074D] font-semibold px-2">{t('description.name')}</h1>
                        </div>
                        <div className="flex bg-gray-200 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#07074D]" viewBox="0 0 20 20"
                                fill="currentColor">
                            </svg>
                            <input
                                className="w-48 bg-gray-50 outline-none ml-1 block "
                                type="text"
                                placeholder={t('description.name')}
                                onChange={onChangeName}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[#07074D] font-semibold px-2">{t('description.email')}</h1>
                        </div>
                        <div className="flex bg-gray-200 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#07074D]" viewBox="0 0 20 20"
                                fill="currentColor">
                            </svg>
                            <input
                                className="w-48 bg-gray-50 outline-none ml-1 block "
                                type="text"
                                placeholder={t('description.email')}
                                onChange={onChangeEmail}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[#07074D] font-semibold px-2">{t('description.comment')}</h1>
                        </div>
                        <div className="flex bg-gray-200 items-center p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#07074D]" viewBox="0 0 20 20"
                                fill="currentColor">
                            </svg>
                            <input
                                className="w-48 bg-gray-50 outline-none ml-1 block "
                                type="text"
                                placeholder={t('description.comment')}
                                onChange={onChangeComment}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                            <ClientsTable loadedClients={currentObjects} loading={loading}/>
                            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedClients.length} paginate={paginate} />
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}
