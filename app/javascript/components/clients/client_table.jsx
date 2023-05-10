import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ClientTable = () => {
    const [loading, setloading] = useState(true)
    const [loadedClient, setLoadedClient] = useState([])
    const [createdClient, setcreatedClient] = useState('')
    const { t } = useTranslation();
    let location = useLocation().pathname.split('clients/')[1];


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/v1/clients/" + location

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedClient(data["client"])
                setcreatedClient(output_date(data["client"].created_at))
                setloading(false)
            }
            );
    }, [])

    const loadingSection = (<div>{t('description.loading')}</div>)

    const output_date = (volume_date) => {
        let output_time = volume_date.split('T')[1]
        output_time = output_time.split(':')[0] + ':' + output_time.split(':')[1]

        return (
            volume_date.split('T')[0] + ' ' + output_time
        )
    }

    const dataSection = (

        <div className="bg-white p-8 rounded-md w-full">

            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">{t('description.client')}</h2>
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
                                        {t('description.email')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.comment')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.active_keys')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.all_keys')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.date_created')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={loadedClient.id}>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">
                                            {loadedClient.name}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">{loadedClient.email}</div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">
                                            {loadedClient.comment}
                                        </div>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">
                                            {loadedClient.activy_keys}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">
                                            {loadedClient.all_keys}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="text-gray-900 whitespace-no-wrap">
                                        { createdClient }
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
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

export default ClientTable;