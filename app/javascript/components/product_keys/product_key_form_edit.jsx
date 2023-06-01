import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export default function ProductKeyForm(props) {    
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setloading] = useState(true)

    const [searchFilelds, setSearchFilelds] = useState('')
    const [searchFileldClientName, setSearchFileldClientName] = useState('')
    const [searchFileldTypeKey, setSearchFileldTypeKey] = useState('')

    const [nameProductKey, setNameProductKey] = useState('')
    const [clientAllowed, setClientAllowed] = useState('')

    const [changeDuration, setChangeDuration] = useState(false)
    const [changeName, setChangeName] = useState(false)
    const [changeNameF, setChangeNameF] = useState(0)
    const [changeNameT, setChangeNameT] = useState(0)

    const [changeTypeKey, setChangeTypeKey] = useState(false)
    const [typeKeyId, setTypeKeyId] = useState(false)

    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])

    const [typeKey, setTypeKey] = useState('');

    const [inputInfiniteKey, setInputInfiniteKey] = useState(false);
    const [clientId, setClientId] = useState(props.client_id);
    const [commentProductKey, setCommentProductKey] = useState('')
    const [inputDuration, setInputDuration] = useState(0)
    const [clientName, setClientName] = useState('')

    const [durationFromTable, setDurationFromTable] = useState(true)

    useEffect(() => {
        //Load parametrs key

        const apiEndpoint = `/api/v1/product_keys/${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameProductKey(data["product_key"].name)
                setInputDuration(data["duration"])
                setInputInfiniteKey(data["product_key"].infinite_period)
                setCommentProductKey(data["product_key"].comment)

                setloading(false)
            }
            );
    }, [])

    useEffect(() => {
        //Load types_of_keys
        const apiEndpoint = `/api/v1/type_of_key/names_types_keys?product_key_id=${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedTypesOfKeys(data["names_types_of_keys"])
                setTypeKey(data["names_types_of_keys"][0])       
            }
            );
    }, [])

    const options = loadedTypesOfKeys.map((typeKey, index) => {
        return <option key={index}>{typeKey}</option>;
    });

    // Key edit
    const ProductKeyEdit = () => {

        fetch(`/api/v1/product_keys/${props.product_key_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                product_key: {
                    duration: inputDuration,
                    infinite_period: inputInfiniteKey,
                    types_of_key_id: typeKeyId,
                    comment: commentProductKey,
                    client_id: clientId,
                    status: status_key
                },
                changeDuration
            }
            ),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => console.log(data.message))
            .catch((error) => console.error(error));
        window.location.replace(`${searchParams.get("loc")}`);
    };

    useEffect(() => {
        //Check input parametrs
        const apiEndpoint = `/api/v1/product_key/check_duration?changeDuration=${changeDuration}&inputDurationKeys=${inputDuration}&changeCheckbox=${inputInfiniteKey}&product_id=${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setDurationFromTable(data["rec_duration_keys"])
            }
            );
    }, [searchFilelds])

    useEffect(() => {
        //load TypeKey id
        const apiEndpoint = `/api/v1/type_key/find_id?nameTypeKey=${typeKey}&changeTypeKey=${changeTypeKey}&productKeyId=${props.product_key_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setTypeKeyId(data["type_key_id"])
            }
            );
    }, [searchFileldTypeKey])

    let status_key = true

    
    useEffect(() => {
        //Check input client name
        const apiEndpoint = `/api/v1/client/check_name_for_edit_key?nameClient=${clientName}&changeName=${changeName}&client_id=${props.client_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {                
                setClientId(data["client_data"]['client_id'])
                setClientAllowed(data["client_data"]['client_allowed'])
            }
            );
    }, [searchFileldClientName])


    const onChangeClientName = (e) => {
        setChangeName(true)
        setClientName(e.target.value);
        setChangeNameF(changeNameF + 1)
    }

    if (changeNameF != changeNameT) {
        setChangeNameT(changeNameF)
        setSearchFileldClientName(changeNameF + 1);

    }

    const onSearchTextChangeInputComment = (e) => {
        setCommentProductKey(e.target.value);
    }

    let onChangeTypeKey = (e) => {
        setTypeKey(e.target.value);
        setChangeTypeKey(true)
        setSearchFileldTypeKey(e.target.value);    
    }

    function changeCheckbox() {
        setInputInfiniteKey(!inputInfiniteKey);
        setSearchFilelds(Math.random());
    }

    const onChangeInputDuration = (e) => {
        setInputDuration(e.target.value);
        setSearchFilelds(e.target.value);
        setChangeDuration(true)
    }

    
    let classNameError = "invisible"
    let classInputError = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    if (!clientAllowed) {
        classNameError = "text-red-600"
        classInputError = "w-full rounded-md border border-[#f44336] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md" 
    }

    let classNameButton = "hover:zshadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let disableButton = false
    
    if ((durationFromTable == false && inputInfiniteKey == false) || (clientAllowed == false)) {
        disableButton = true
    }

    let classDurationError = "text-red-600"
    let classInputErrorDuration = "w-full rounded-md border border-[#f44336] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"

    if (durationFromTable || inputInfiniteKey == true) {
        classDurationError = "invisible"
        classInputErrorDuration = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

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
                            defaultValue={props.client_name}
                            onChange={onChangeClientName}
                            className={classInputError}
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
                            defaultValue={inputDuration}
                            onChange={onChangeInputDuration}
                            className={classInputErrorDuration}
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
                            value={typeKey}
                            
                            onChange={onChangeTypeKey}
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