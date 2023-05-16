import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const ProductKeyForm = (props) => {
    const [loading, setloading] = useState(true)
    const { t } = useTranslation();
    const [searchFilelds, setSearchFilelds] = useState('')
    const [searchFileldClient, setSearchFileldClient] = useState('')
    const [inputInfiniteKey, setInputInfiniteKey] = useState(false);  
    const [value, setValue] = useState('');
    const [inputDuration, setInputDuration] = useState(0)
    const [inputTypeKey, setInputTypeKey] = useState('')
    const [inputClient, setInputClient] = useState('')
    const [nameProductKey, setNameProductKey] = useState('')
    const [durationProductKey, setDurationProductKey] = useState(0)
    const [commentProductKey, setCommentProductKey] = useState('')
    const [clientName, setClientName] = useState('')
    const [clientId, setClientId] = useState('')
    const [countChangeName, setCountChangeName] = useState(0)
    const [checkName, setCheckName] = useState('')
    
    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])
    const [loadedIdTypesOfKeys, setLoadedIdTypesOfKeys] = useState([])
   
    useEffect(() => {
        //Load types_of_keys
        const apiEndpoint = `/api/v1/type_of_key/names_types_keys?product_key_id=${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedTypesOfKeys(data["names_types_of_keys"])
                setLoadedIdTypesOfKeys(data["id_types_of_keys"])
                setInputTypeKey(data["id_types_of_keys"][0])
            }
            );
    }, [])
    const options = loadedTypesOfKeys.map((typeKey, index) => {
        return <option key={index}>{typeKey}</option>;
    });

    const [durationFromTable, setDurationFromTable] = useState(true)
    useEffect(() => {
        //Check input parametrs
        const apiEndpoint = `/api/v1/product_key/check_fields?inputVolumeKeys=${1}&inputDurationKeys=${inputDuration}&changeCheckbox=${inputInfiniteKey}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setDurationFromTable(data["rec_duration_keys"])
            }
            );
    }, [searchFilelds])
    
    useEffect(() => {
        //Check input client name
        const apiEndpoint = `/api/v1/client/check_name_for_edit_key?nameClient=${inputClient}&countChangeName=${countChangeName}&client_id=${props.client_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setClientId(data["client"])
            }
            );
    }, [searchFileldClient])

    // Key edit
    const ProductKeyEdit = () => {

        fetch(`/api/v1/product_keys/`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                productKey: {
                    volumeKeys: 1,
                    duration: inputDuration,
                    infinite_period: inputInfiniteKey,
                    types_of_key_id: inputTypeKey,
                    comment: inputComment,
                    client_id: clientId
                },
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => console.log(data.message))
            .catch((error) => console.error(error));
        window.location.replace(`/clients/${props.client_id}`);
    };

    const onChangeInputDuration = (e) => {
        setInputDuration(e.target.value);
        setSearchFilelds(e.target.value);
    }

    const onChangeInputClient = (e) => {
        setInputClient(e.target.value);
        setSearchFileldClient(e.target.value);
        setCountChangeName(countChangeName + 1)
    }

    function changeCheckbox() {
        setInputInfiniteKey(!inputInfiniteKey);
        setSearchFilelds(Math.random());
    }

    const onSearchTextChangeInputComment = (e) => {
        setInputComment(e.target.value);
    }

    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let disableButton = false
    if ((durationFromTable == false && inputInfiniteKey == false) || (clientId == false)) {
        disableButton = true
    }

    let classDurationError = "text-red-600"

    if (durationFromTable || inputInfiniteKey == true) {
        classDurationError = "invisible"
    }

    let classNameError = "text-red-600"

    if (clientId != false) {
        classNameError = "invisible"
    }

    let changeTypeKey = (e) => {
        setValue(e.target.value)
        setInputTypeKey(loadedIdTypesOfKeys[loadedTypesOfKeys.indexOf(e.target.value)]);
    }

    useEffect(() => {
        //Check input parametrs

        const apiEndpoint = `/api/v1/product_keys/${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameProductKey(data["product_key"].name)
                setDurationProductKey(data["duration"])
                setInputDuration(data["duration"])
                setClientName(data["client_name"])
                setInputInfiniteKey(data["product_key"].infinite_period)
                setCommentProductKey(data["product_key"].comment)

                setloading(false)
            }
            );
    }, [])

    const loadingSection = (<div>{t('description.loading')}</div>)

    const dataSection = (

        <div className="flex items-center justify-center p-12">
            
            <div className="mx-auto w-full max-w-[550px]">

            <h2 className="text-gray-600 font-semibold text-xl mb-19">{`${t('description.product_key_edit')} ${nameProductKey}`}</h2>
            
            <br></br>

                <div className="-mx-3 flex flex-wrap">
                    <div className="mb-5 w-full px-3 sm:w-2/3">
                        <label
                            htmlFor="fClientName"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            {t('description.client_name')}
                        </label>
                        <input
                            type="text"
                            name="fClientName"
                            id="fVolumeDays"
                            placeholder={t('description.client_name')}
                            defaultValue={clientName}
                            onChange={onChangeInputClient}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <div className={classNameError}>{t('description.error2_name_keys')}</div>
                    </div>
                </div>

                <div className="-mx-3 flex flex-wrap">
                    <div className="mb-3 w-full px-3 sm:w-2/3">
                        <label
                            htmlFor="fVolumeDays"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            {t('description.volume_days')}
                        </label>
                        <input
                            type="number"
                            name="fVolumeDays"
                            id="fVolumeDays"
                            placeholder={t('description.volume_days')}
                            defaultValue={durationProductKey}
                            onChange={onChangeInputDuration}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <div className={classDurationError}>{t('description.error1_duration_keys')}</div>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="mb-3 block text-base font-medium text-[#07074D]">

                        <input
                            type="checkbox"
                            checked={inputInfiniteKey}
                            onChange={changeCheckbox}
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded mr-2" />

                        {t('description.infinite_key')}
                    </div>


                    <br></br>
                    <div className="mb-5 block text-base font-medium text-[#07074D]">
                        <p>{t('description.select_type_key')}</p>
                        <br></br>
                        <select className="p-1 px-2 outline-none w-2/3 bg-white"
                                value={value}
                                onChange={changeTypeKey}
                                >
                            {options}
                        </select>

                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="comment"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            {t('description.comment')}
                        </label>
                        <textarea
                            rows="3"
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder={t('description.input_comment')}
                            min="0"
                            defaultValue={commentProductKey}
                            onChange={onSearchTextChangeInputComment}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                </div>
                <br></br>

                <div>
                    <button
                        className={classNameButton}
                        onClick={() => ProductKeyEdit()}
                        disabled={disableButton}
                    >
                        {t('description.create_product_key')}
                    </button>
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

export default ProductKeyForm;