import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

export default function ProducrKeysTable(props) {
    const { t } = useTranslation();

    const [currentKey, setCurrentKey] = useState()
    const [currentKeyId, setCurrentKeyId] = useState()
    const [delKey, setDelKey] = useState([])
    let [showModal, setShowModal] = useState(false)
    

    let status = t('description.no_active')
    let clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-white text-sm text-center"

    let statusKey = (statusProductKey) => {

        if (statusProductKey == true) {
            status = t('description.active')
            clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-green-400 text-sm text-center"
        } else {
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
        window.location.assign(`product_keys/${id}/edit`)
    };

    const PkClient = (client) => {
        if (client != null) {
            return (client['name'])
        }
    }

    const PkClientId = (client) => {
        if (client != null) {
            return (client['id'])
        }
    }

    const output_date = (volume_date) => {
        let output_time = volume_date.split('T')[1]
        output_time = output_time.split(':')[0] + ':' + output_time.split(':')[1]

        return (
            volume_date.split('T')[0] + ' ' + output_time
        )
    }

    const needHide = (id) => {

        let needHid = "invisible"

        if (delKey.indexOf(id) == -1) {
            needHid = "visible"
        }

        return needHid
    }

    const pathEdit = (data_pk) => {
        if (data_pk['client'] != null) {
            return (`/clients/${data_pk['client']['id']}/product_keys/${data_pk.id}/edit?loc=/product_keys`)
        } else {
            return (`/clients/0/product_keys/${data_pk.id}/edit`)
        }
    }

    const RequestDeleteProductKey = async (id) => {
        await fetch(`/api/v1/product_keys/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                
                return response.json()                
            }
        });
        
    };


    const deleteProductKey = (id, name) => {
        setCurrentKey(name)
        setCurrentKeyId(id)
        setShowModal(true)
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
                            
                            RequestDeleteProductKey(currentKeyId);
                            let buffer_key = delKey
                            buffer_key.push(currentKeyId)
                            setDelKey(buffer_key)                            
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
                                        className="px-6 py-3 w-20 h-20 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.day_end_key')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                                        {t('description.client')}
                                    </th>
                                    <th
                                        className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.productKeys.map((productKey, index) => {
                                    return (
                                        <tr key={productKey.id} className={needHide(productKey.id)}>

                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    <Link to={pathEdit(productKey)}>{productKey.name}</Link>
                                                </div>
                                            </td>
                                            {statusKey(productKey.status)}
                                            <td className={clasStatusKey}>
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {status}
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {durationDescription(productKey.duration)}
                                                    {duration}
                                                </div>
                                            </td>


                                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{productKey.comment}</p>
                                            </td>
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {productKey.type_of_key}
                                                </div>
                                            </td>
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    {output_date(productKey.created_at)}
                                                </div>
                                            </td>

                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">
                                                    <Link to={`/clients/${String(PkClientId(productKey['client']))}`}>{PkClient(productKey['client'])}</Link>
                                                </div>
                                            </td>
                                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <div className="text-gray-900 whitespace-no-wrap">

                                                    <div className="items-center ...">

                                                        <button
                                                            className='relative inline-flex text-xs sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                                            text-white bg-[#3333D1] hover:bg-[#7f1d1d] focus:border-[#B3B3FD] focus:bg-[#4040F2] px-4 py-1 xs:py-1.5 xs:px-5'
                                                            onClick={() => deleteProductKey(productKey.id, productKey.name)}

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

    console.log('PKT')
    console.log(localStorage.getItem('loadingKeys'))
    

    if (localStorage.getItem('loadingKeys') == 'true') {
        return loadingSection
    } else {
        return dataSection
    }
}