import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

export default function ClientKeysTable(props) {
    const [nameClient, setNameClient] = useState('')
    let [showModal, setShowModal] = useState(false)
    const [currentKey, setCurrentKey] = useState()
    const [currentKeyId, setCurrentKeyId] = useState()

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

    const deleteClientKey = async (id) => {
        await fetch(`/api/v1/product_keys/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
              }
        });
        window.location.replace(`${localStorage.getItem('pageClientKeys')}`);

    };

    const deleteProductKey = (id, name) => {
        setCurrentKey(name)
        setCurrentKeyId(id)
        setShowModal(true)
    };

    let status = t('description.no_active')
    let clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-white text-sm text-center"

    let statusKey = (statusProductKey) => {

        if (statusProductKey == true ) {
            status = t('description.active')
            clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-green-400 text-sm text-center"
        } else {
            status = t('description.no_active')
            clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-red-400 text-sm text-center"
        }
    }
    let duration = ""
    let durationDescription = (clientKey) => {
        if (clientKey == 0) {
            duration = 0
        }

        if (clientKey > 0) {
            duration = clientKey
        }

        if (clientKey == -1) {
            duration = t('description.infiniteKey')
        }
    } 

    const editClientKey = async (id) => {
        window.location.assign(`product_keys/${id}/edit?loc=/clients/${props.client_id}`)        
    };

    
    
    const loadingSection = (<div>{t('description.loading')}</div>)

    const dataSection = (
        <div>

<Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.delete_key')} {currentKey} </h1>
                        <button 
                          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                          onClick={() => {
                            
                            deleteClientKey(currentKeyId);                           
                            setShowModal(false)
                            
                        }}
                          > {t('description.delete')}
                        </button>

                        <button 
                          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                          onClick={() => {
                            localStorage.setItem('loadingKeys', true);
                            setShowModal(false);
                            }}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>

        <div className="bg-white p-8 rounded-md w-full">

            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold"> {`${t('description.product_keys_client')}`} <NavLink className="text-blue-950 text-xl" to={`/clients/${props.client_id}`} > {` ${nameClient}`}</NavLink></h2>
                </div>
            </div>
            <div>
                <div className="">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal table-fixed">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.name')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"   >
                                        {t('description.key_status')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.day_end_key')}
                                    </th>

                                    
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.comment')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.type_of_key')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.date_created')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.clientKeys.map((clientKey, index) => {
                                    return (
                                        <tr key={clientKey.id}>

                                            <td className="px-5 py-150 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    <Link to={String(clientKey.id)}>{clientKey.name}</Link>
                                                    
                                                </div>
                                            </td>  
                                            {statusKey(clientKey.status)}
                                            <td className={clasStatusKey}>
                                                <div className="text-gray-900 whitespace-no-wrap">                                                    
                                                    {status}
                                                </div>
                                            </td> 
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {durationDescription(clientKey.duration)}
                                                    {duration}
                                                </div>
                                            </td>                                                                                      
                                            
                                            
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{clientKey.comment}</p>
                                            </td>
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                {clientKey.type_key}
                                                </div>
                                            </td>
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {clientKey.created_at}
                                                </div>
                                            </td>

                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">

                                                    <div className="flex items-stretch ...">

                                                        <button
                                                            onClick={() => editClientKey(clientKey.id)}                                                            
                                                            className='relative inline-flex text-sx sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                                             text-white bg-[#4040F2] hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2] mx-1 px-4 py-1 xs:py-1.5 xs:px-5'

                                                        >
                                                            {t('description.edit')}
                                                        </button>


                                                        <button
                                                            className='relative inline-flex text-xs sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                                            text-white bg-[#f87171] hover:bg-[#7f1d1d] focus:border-[#B3B3FD] focus:bg-[#4040F2] px-4 py-1 xs:py-1.5 xs:px-5'
                                                            onClick={() => deleteProductKey(clientKey.id, clientKey.name)}
                                                            
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

    if (localStorage.getItem('loadingClientKeys') == 'true') {
        return loadingSection
    } else {
        return dataSection
    }
}

