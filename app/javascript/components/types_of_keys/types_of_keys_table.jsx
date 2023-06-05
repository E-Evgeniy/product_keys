import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

const TypesOfKeysTable = () => {
    const [loading, setloading] = useState(true)
    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])
    const [currentTypeOfKey, setCurrentTypeOfKey] = useState()
    const [currentTypeOfKeyId, setCurrentTypeOfKeyId] = useState()
    let [showModal, setShowModal] = useState(false)
    const { t } = useTranslation();

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/v1/types_of_keys"

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedTypesOfKeys(data["types_of_keys"])
                setloading(false)
            }
            );
    }, [loading])

    const deleteTPK = async (id) => {
        await fetch(`/api/v1/types_of_keys/${currentTypeOfKeyId}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        });
        setloading(true)
    };

    const editTypesOfKey = async (id) => {
        window.location.assign(`types_of_keys/${id}/edit`)        
    };

    const deleteTypesOfKey = (id, name) => {
        setCurrentTypeOfKey(name)
        setCurrentTypeOfKeyId(id)
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
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.delete_type_of_key')} {currentTypeOfKey} </h1>
                        <button 
                          className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                          onClick={() => {
                            
                            deleteTPK(currentTypeOfKeyId);
                            setShowModal(false)
                            
                        }}
                          > {t('description.delete')}
                        </button>

                        <button 
                          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                          onClick={() => {
                            setloading(true);
                            setShowModal(false)}}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>

        <div className="bg-white p-8 rounded-md w-full">

            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">{t('description.types_of_keys')}</h2>
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
                                        {t('description.comment')}
                                    </th>                                    
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {t('description.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedTypesOfKeys.map((type_key, index) => {
                                    return (
                                        <tr key={type_key.id}>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                  {type_key.name}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {type_key.comment}
                                                </p>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="text-gray-900 whitespace-no-wrap">

                                                <div className="flex items-stretch ...">                                                
                                                    <button
                                                        onClick={() => editTypesOfKey(type_key.id)}
                                                        className='relative inline-flex text-sx sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-[#4040F2] hover:bg-[#3333D1] focus:border-[#B3B3FD] focus:bg-[#4040F2] mx-1 px-4 py-1 xs:py-1.5 xs:px-5'
                                                        
                                                    >
                                                        {t('description.edit')}
                                                    </button>                                                

                                                    <button
                                                        className='relative inline-flex text-xs sm:text-base rounded-full font-medium border-2 border-transparent transition-colors outline-transparent focus:outline-transparent disabled:opacity-50 disabled:pointer-events-none disabled:opacity-40 disabled:hover:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
        text-white bg-[#f87171] hover:bg-[#7f1d1d] focus:border-[#B3B3FD] focus:bg-[#4040F2] px-4 py-1 xs:py-1.5 xs:px-5'
                                                        onClick={() => deleteTypesOfKey(type_key.id, type_key.name )}
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

    if (loading) {
        return loadingSection
    } else {
        return dataSection
    }
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

export default TypesOfKeysTable;