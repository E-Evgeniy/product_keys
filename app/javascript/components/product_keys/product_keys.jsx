import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ProducrKeysTable from "./product_keys_table";
import Pagination from "../pagination";

export default function Clients() {
    const [inputInfiniteKey, setInputInfiniteKey] = useState(false);
    const [findNamePK, setFindNamePK] = useState('')
    const [searchFileld, setSearchFileld] = useState('')
    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])
    const [typeKey, setTypeKey] = useState('');
    const [statusKeyFind, setStatusKeyFind] = useState('');
    const [productKeys, setProductKeys] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(5)

    const { t } = useTranslation();

    const ALL = t('description.all')
    const ACTIVE = t('description.active_keys_arr')
    const NO_ACTIVE = t('description.no_active_keys_arr')

    const onChangeNamePK = (e) => {
        setFindNamePK(e.target.value);
        setSearchFileld(e.target.value);
    }

    const menuLeftTextClass = () => {
        return (
            'list-none  hover:text-indigo-900 hover:text-lg hover:font-bold'
        )
    }

    function changeInfiniteKey() {
        setInputInfiniteKey(!inputInfiniteKey);
        setSearchFileld(Math.random());
    }

    useEffect(() => {
        //Load types_of_keys
        const apiEndpoint = `/api/v1/type_of_key/names_types_keys`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedTypesOfKeys(data["names_types_of_keys"])
            }
            );
    }, [])

    useEffect(() => {
        //Request product keys

        const apiEndpoint = `/api/v1/product_keys?findNamePK=${findNamePK}&inputInfiniteKey=${inputInfiniteKey}&typeKey=${typeKey}&statusKey=${statusKeyFind}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setProductKeys(data["product_keys"])
                localStorage.setItem('loadingKeys', false);
            }
            );
    }, [searchFileld, localStorage.getItem('loadingKeys')])


    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = productKeys.slice(firstObjectsIndex, lastObjectsIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    if (loadedTypesOfKeys[0] != ALL) {loadedTypesOfKeys.unshift(ALL)} 

    const options = loadedTypesOfKeys.map((typeKey, index) => {
        return <option key={index}>{typeKey}</option>;
    });

    const array_keys = [ALL, ACTIVE, NO_ACTIVE].map((statusKeyFind, index) => {
        return <option key={index}>{statusKeyFind}</option>;
    });

    function changeInfiniteKey() {
        setInputInfiniteKey(!inputInfiniteKey);
        setSearchFileld(Math.random());
    }

    let onChangeTypeKey = (e) => {
        setTypeKey(e.target.value);
        setSearchFileld(e.target.value);
    }

    let onChangeStatusKey = (e) => {
        setStatusKeyFind(e.target.value);
        setSearchFileld(e.target.value);
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
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="/" className={menuLeftTextClass}> {t('description.main')} </NavLink></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><NavLink to="#" className={menuLeftTextClass}> {t('description.exit')} </NavLink></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 rounded-md h-100">
                            <div className="items-center">
                                <h2 className="me-2 text-2xl text-gray-900 font-semibold text-center">{t('description.product_keys')}</h2>
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
                                            onChange={onChangeNamePK}>
                                        </input>
                                    </div>
                                </div>

                                <div className="mb-0 block text-base font-medium text-[#07074D]">

                                    <input
                                        type="checkbox"
                                        checked={inputInfiniteKey}
                                        onChange={changeInfiniteKey}
                                        className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded mr-2" />

                                    {t('description.get_infinite_keys')}
                                </div>


                                <div className=" mb-0 block text-base font-medium text-[#07074D]">

                                    {t('description.type_of_key')}

                                    <select className=" mx-2 outline-none bg-white text-gray-700"
                                        value={typeKey}

                                        onChange={onChangeTypeKey}
                                    >
                                        {options}
                                    </select>
                                </div>

                                <div className="mb-0 block text-base font-medium text-[#07074D]">

                                    {t('description.status')}

                                    <select className="p-1 px-2 outline-none bg-white text-gray-700 mx-2"
                                        value={statusKeyFind}

                                        onChange={onChangeStatusKey}
                                    >
                                        {array_keys}
                                    </select>

                                </div>
                            </div>
                            <ProducrKeysTable productKeys={currentObjects} />
                            < Pagination objectsPerPage={objectsPerPage} totalObjects={productKeys.length} paginate={paginate} />
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}
