import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ClientFormEdit = () => {
  const [loading, setloading] = useState(true)
  const { t } = useTranslation();
 
  const [nameFromTable, setNameFromTable] = useState(true)
  const [emailFromTable, setEmailFromTable] = useState(true)
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputComment, setInputComment] = useState('')
  const [searchFilelds, setSearchFilelds] = useState('')

  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editComment, setEditComment] = useState('')

  const [countEditName, setCountEditName] = useState(0)
  const [countEditEmail, setCountEditEmail] = useState(0)
  const [countEditComment, setCountEditComment] = useState(0)

  let location = useLocation().pathname.split('clients/')[1];
    location = location.split('/edit')[0];


    const createClient = (id) => {

      fetch(`/api/v1/clients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          client: {name: filedName(inputName, countEditName, editName),
                   email: filedEmail(inputEmail, countEditEmail, editEmail),
                   comment: filedComment(inputComment, countEditComment, editComment)},
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
      window.location.assign('/clients')
    };

    let filedName = (inputName, countEditName, editName) => {      
      let rezult = inputName
      if (countEditName == 0) {
        rezult = editName
      } 
      return rezult
    }

    let filedEmail = (inputEmail, countEditEmail, editEmail) => {
      let rezult = inputEmail
      if (countEditEmail == 0) {
        rezult = editEmail
      } 
      return rezult
    }

    let filedComment = (inputComment, countEditComment, editComment) => {
      let rezult = inputComment
      if (countEditEmail == 0) {
        rezult = editComment
      } 
      return rezult
    }


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/client/find_for_edit?id=${location}&inputName=${inputName}&inputEmail=${inputEmail}&countEditName=${countEditName}&countEditEmail=${countEditEmail}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setNameFromTable(data["client"].inputName)
                setEmailFromTable(data["client"].inputEmail)
                setEditName(data["client_edit"].name)
                setEditEmail(data["client_edit"].email)   
                setEditComment(data["client_edit"].comment)
                setloading(false)
            }
            );
    }, [searchFilelds])

    const onSearchTextChangeInputName = (e) => {
      setInputName(e.target.value);
      setSearchFilelds(e.target.value);
      setCountEditName(countEditName+1)
      if (countEditEmail == 0 ) {
        setInputEmail(editEmail)
      }
    }

    const onSearchTextChangeInputEmail = (e) => {
      setInputEmail(e.target.value);
      setSearchFilelds(e.target.value);
      setCountEditEmail(countEditEmail+1)
      if (countEditName == 0 ) {
        setInputName(editName)
      }
    }

    const onSearchTextChangeInputComment = (e) => {
      setInputComment(e.target.value);
      setCountEditComment(countEditComment+1)
    }


    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameErrorName = "text-red-600"

    let disableButton = false

    if (countEditName > 0 || countEditEmail > 0) {
      if ((inputName == '' || inputEmail == '') || (nameFromTable == false || emailFromTable == false) ) {
        disableButton = true
      }
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
                  defaultValue={editName}
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
                  defaultValue={editEmail}                
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
              defaultValue={editComment} 
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>                        
    
          <div>
            <button
              className={classNameButton}
              disabled={disableButton}
              onClick={() => createClient(location)}
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

export default ClientFormEdit;