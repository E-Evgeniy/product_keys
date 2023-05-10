import React, { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';

const ClientForm = () => {
    const [loading, setloading] = useState(true)
    const { t } = useTranslation();
   
    const [nameFromTable, setNameFromTable] = useState(true)
    const [emailFromTable, setEmailFromTable] = useState(true)
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputComment, setInputComment] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')


    const createClient = () => {

      fetch(`/api/v1/clients/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          client: {name: inputName, email: inputEmail, comment: inputComment},
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
      window.open('/clients')
    };


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/client/find?inputName=${inputName}&inputEmail=${inputEmail}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["client"].inputName)
                setEmailFromTable(data["client"].inputEmail)            
                setloading(false)
            }
            );
    }, [searchFilelds])

    const onSearchTextChangeInputName = (e) => {
      setInputName(e.target.value);
      setSearchFilelds(e.target.value);
    }

    const onSearchTextChangeInputEmail = (e) => {
      setInputEmail(e.target.value);
      setSearchFilelds(e.target.value);
    }

    const onSearchTextChangeInputComment = (e) => {
      setInputComment(e.target.value);
    }

    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameErrorName = "text-red-600"

    let disableButton = false

    if ((inputName == '' || inputEmail == '') || (nameFromTable == false || emailFromTable == false)) {
      disableButton = true
    }

   

    if (nameFromTable)  {
      classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      classNameErrorName = "invisible"
    }

    let classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classEmailErrorName = "text-red-600"

    if (emailFromTable)  {
      classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      classEmailErrorName = "invisible"
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
                  {t('description.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder= {t('description.name')}
                  onChange={onSearchTextChangeInputName}
                  className={classNameFiled}
                />
                <div className={classNameErrorName}>{t('description.error1_name')}</div>
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  {t('description.email')}
                </label>
                <input
                  type="text"
                  name="email"
                  id="lName"
                  placeholder={t('description.email')}
                  onChange={onSearchTextChangeInputEmail}
                  className={classEmailFiled}                  
                />
                <div className={classEmailErrorName}>{t('description.error1_email')}</div>
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
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder={t('description.input_comment')}
              min="0"
              onChange={onSearchTextChangeInputComment}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>                        
    
          <div>
            <button
              className={classNameButton}
              disabled={disableButton}
              onClick={() => createClient()}
            >
               {t('description.create_client')}
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

export default ClientForm;