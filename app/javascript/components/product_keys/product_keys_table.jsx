import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ProducrKeysTable() {
    const { t } = useTranslation();

    const [loading, setloading] = useState(true)
    const [productKeys, setProductKeys] = useState([])
    const [inputInfiniteKey, setInputInfiniteKey] = useState(false);
    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])
    const [typeKey, setTypeKey] = useState('');
    

    useEffect(() => {
        //Request product keys

        const apiEndpoint = "/api/v1/product_keys"
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setProductKeys(data["product_keys"])
                setloading(false)
            }
            );
    }, [loading])

    const options = loadedTypesOfKeys.map((typeKey, index) => {
        return <option key={index}>{typeKey}</option>;
    });


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


    const deleteClientKey = async (id) => {
        await fetch(`/api/v1/product_keys/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
              }
        });
        setloading(true)
    };

    let status = t('description.no_active')
    let clasStatusKey = "px-3 py-5 border-b border-gray-200 bg-white text-sm text-center"

    let statusKey = (statusProductKey) => {

        if (statusProductKey == true ) {
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

    let onChangeTypeKey = (e) => {
        setTypeKey(e.target.value);
        setSearchFileldTypeKey(e.target.value);    
    }

    const pathEdit = (data_pk) => {
        if (data_pk['client'] != null) {
            return (`/clients/${data_pk['client']['id']}/product_keys/${data_pk.id}/edit?loc=/product_keys`)
        } else {
            return (`/clients/0/product_keys/${data_pk.id}/edit`)
        }
    }

    const deleteProductKey = async (id) => {
        await fetch(`/api/v1/product_keys/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
              }
        });
        setloading(true)
    };

    function changeCheckbox() {
        setInputInfiniteKey(!inputInfiniteKey);
        setSearchFilelds(Math.random());
    }
    
    const loadingSection = (<div>{t('description.loading')}</div>)

    const dataSection = (

        <div className="bg-white p-8 rounded-md w-full">
            <div>
            <div>
                    <h2 className="text-gray-600 font-semibold">{t('description.product_keys')}</h2>
                </div>
            <div className=" flex items-center justify-between pb-6">
                
                <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-600 font-semibold px-2">{t('description.name')}</h1>
                </div>
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                        </svg>
                        <input className="w-48 bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder={t('description.name')}></input>
                    </div>
                </div>
                 <div className="mb-5 block text-base font-medium text-[#07074D]">
                        <p>{t('description.select_type_key')}</p>
                        <br></br>
                        <select className="p-1 px-2 outline-none w-2/3 bg-white"
                            value={typeKey}
                            
                            onChange={onChangeTypeKey}
                        >
                            {options}
                        </select>

                    </div>

                    <div className="mb-0 block text-base font-medium text-[#07074D]">

                        <input
                            type="checkbox"
                            checked={inputInfiniteKey}
                            onChange={changeCheckbox}
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded mr-2" />

                        {t('description.infinite_key')}
                    </div>
            </div>
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
                                    {productKeys.map((productKey, index) => {
                                    return (
                                        <tr key={productKey.id}>

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
                                                            onClick={() => deleteProductKey(productKey.id)}
                                                            
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
