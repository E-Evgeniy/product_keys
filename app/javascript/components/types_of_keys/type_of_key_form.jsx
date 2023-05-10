import React, { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';

const TypesOfKeyForm = () => {
    const [loading, setloading] = useState(true)
    const { t } = useTranslation();

    const [nameFromTable, setNameFromTable] = useState(true)
    const [commentFromTable, setCommentFromTable] = useState(true)
    const [inputName, setInputName] = useState('')
    const [inputComment, setInputComment] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')


    const createTypesOfKey = () => {

        fetch(`/api/v1/types_of_keys/`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                type_of_key: { name: inputName, comment: inputComment },
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => console.log(data.message))
            .catch((error) => console.error(error));
        setloading(true)
        window.open('/types_of_keys')
    };


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/type_of_key/find?inputName=${inputName}&inputComment=${inputComment}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["type_of_key"].inputName)
                setCommentFromTable(data["type_of_key"].inputComment)
                setloading(false)
            }
            );
    }, [searchFilelds])

    const onSearchTextChangeInputName = (e) => {
        setInputName(e.target.value);
        setSearchFilelds(e.target.value);
    }

    const onSearchTextChangeInputComment = (e) => {
        setInputComment(e.target.value);
        setSearchFilelds(e.target.value);
    }

    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameErrorName = "text-red-600"

    let disableButton = false

    if ((inputName == '' || inputComment == '') || (nameFromTable == false || commentFromTable == false)) {
        disableButton = true
    }


    if (nameFromTable) {
        classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        classNameErrorName = "invisible"
    }

    let classCommentFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classCommentErrorName = "text-red-600"

    if (commentFromTable) {
        classCommentFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        classCommentErrorName = "invisible"
    }


    const loadingSection = (<div>{t('description.loading')}</div>)

    const dataSection = (

        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                {t('description.type_of_key')}
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={t('description.name')}
                                onChange={onSearchTextChangeInputName}
                                className={classNameFiled}
                            />
                            <div className={classNameErrorName}>{t('description.error1_name')}</div>
                        </div>
                    </div>

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
                        onChange={onSearchTextChangeInputComment}
                        className={classCommentFiled}
                    />
                    <div className={classCommentErrorName}>{t('description.error1_comment')}</div>
                </div>

                <div>
                    <button
                        className={classNameButton}
                        disabled={disableButton}
                        onClick={() => createTypesOfKey()}
                    >
                        {t('description.create_type_of_key')}
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

export default TypesOfKeyForm;