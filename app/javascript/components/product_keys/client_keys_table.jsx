import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ClientKeysTable(props) {
    const [loading, setloading] = useState(false)
    const [nameClient, setNameClient] = useState('')
    const { t } = useTranslation();

    useEffect(() => {
        //Request client's name

        const apiEndpoint = "/api/v1/clients/" + props.client_id
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameClient(data["client"].name)
            }
            );
    }, [])

    useEffect(() => {
        //Request on client keys

        const apiEndpoint = `/api/v1/client/product_keys?client_id=${props.client_id}&showKeys=${props.show_keys}`  

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLoadedClients(data["clients"])
                setloading(false)
            }
            );
    }, [loading])


    const dataSection = (

        <div className="bg-white p-8 rounded-md w-full">

            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold"> {`${t('description.product_keys')} ${nameClient}`}</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                        </svg>
                        <input className="w-48 bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."></input>
                    </div>
                </div>
            </div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.name')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.day_end_key')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.comment')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.type_of_key')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.date_created')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.actions')}
                                    </th>
                                </tr>
                            </thead>
                           
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

    if (loading) {
        return loadingSection
    } else {
        return dataSection
    }
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above
