import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ClientsTable() {
    const [loading, setloading] = useState(true)
    const [loadedClients, setLoadedClients] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/v1/clients"

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data["clients"])
                setLoadedClients(data["clients"])
                setloading(false)
            }
            );
    }, [loading])

    const deleteClient = async (id) => {
        await fetch(`/api/v1/clients/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                setPosts(
                    clients.filter((client) => {
                        return client.id !== id;
                    })
                );
            } else {
                return;
            }
        });
        setloading(true)
    };

    const editClient = async (id) => {
        window.location.assign(`clients/${id}/edit`)        
    };

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
                    <h2 className="text-gray-600 font-semibold">{t('description.clients')}</h2>
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
                                        {t('description.email')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.comment')}
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.date_created')}
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
                                        {t('description.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedClients.map((client, index) => {
                                    return (
                                        <tr key={client.id}>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    <Link to={String(client.id)}>{client.name}</Link>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{client.email}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {client.comment}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {output_date(client.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {client.all_keys}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {client.all_keys}
                                                </div>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">

                                                    <div className="flex items-stretch ...">

                                                        <button
                                                            onClick={() => editClient(client.id)}
                                                            className='relative inline-flex text-sx sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-[#4040F2] hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2] mx-1 px-4 py-1 xs:py-1.5 xs:px-5'

                                                        >
                                                            {t('description.edit')}
                                                        </button>


                                                        <button
                                                            className='relative inline-flex text-xs sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-[#f87171] hover:bg-[#7f1d1d] focus:border-[#B3B3FD] focus:bg-[#4040F2] px-4 py-1 xs:py-1.5 xs:px-5'
                                                            onClick={() => deleteClient(client.id)}
                                                        >
                                                            {t('description.delete')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
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
