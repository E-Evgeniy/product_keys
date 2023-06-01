import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

export default function ClientsTable(props) {
    
    const [currentClient, setCurrentClient] = useState()
    const [currentClientId, setCurrentClientId] = useState()
    const [delClient, setDelClient] = useState([])

    let [showModal, setShowModal] = useState(false)
    const { t } = useTranslation();

    const RequestDeleteClient = async (id) => {
        await fetch(`/api/v1/clients/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
              }
        });
    };

    const deleteClient = (id, name) => {
        setCurrentClient(name)
        setCurrentClientId(id)
        setShowModal(true)
    };


    const editClient = async (id, name) => {
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

    const needHide = (id) => {

        let needHid = "invisible"

        if (delClient.indexOf(id) == -1) {
            needHid = "visible"
        }

        return needHid
    }

    const dataSection = (
        <div>
            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.delete_client')} {currentClient} {t('description.delete_and_key')}</h1>
                        <button 
                          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                          onClick={() => {
                            
                            RequestDeleteClient(currentClientId);
                            let buffer_client = delClient
                            buffer_client.push(currentClientId)
                            setDelClient(buffer_client)
                            setShowModal(false)
                            
                        }}
                          > {t('description.delete')}
                        </button>

                        <button 
                          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                          onClick={() => {setShowModal(false)}}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>
            <div className="bg-white p-8 rounded-md w-full">

               
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.name')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.email')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.comment')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.date_created')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.active_keys')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.all_keys')}
                                        </th>
                                        <th
                                            className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {t('description.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.loadedClients.map((client, index) => {
                                        return (
                                            <tr key={client.id} className={needHide(client.id)}>

                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">
                                                        <Link to={String(client.id)}>{client.name}</Link>
                                                    </div>
                                                </td>
                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{client.email}</p>
                                                </td>
                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">
                                                        {client.comment}
                                                    </div>
                                                </td>
                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">
                                                        {output_date(client.created_at)}
                                                    </div>
                                                </td>
                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">
                                                        {client.all_keys}
                                                    </div>
                                                </td>
                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">
                                                        <Link to={`/clients/${client.id}/product_keys?showKeys=all`} >{client.all_keys}</Link>
                                                    </div>
                                                </td>

                                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="text-gray-900 whitespace-no-wrap">

                                                        <div className="flex items-stretch ...">

                                                            <button
                                                                onClick={() => editClient(client.id, client.name)}
                                                                className='relative inline-flex text-sx sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
text-white bg-[#4040F2] hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2] mx-1 px-4 py-1 xs:py-1.5 xs:px-5'

                                                            >
                                                                {t('description.edit')}
                                                            </button>


                                                            <button
                                                                className='relative inline-flex text-xs sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
text-white bg-[#f87171] hover:bg-[#7f1d1d] focus:border-[#B3B3FD] focus:bg-[#f87171] px-4 py-1 xs:py-1.5 xs:px-5'
                                                                onClick={() => deleteClient(client.id, client.name)}
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
        </div>
    )

    if (props.loading) {
        return loadingSection
    } else {
        return dataSection
    }
}
