import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const type_of_keyFormEdit = () => {
  const [loading, setloading] = useState(true)
  const { t } = useTranslation();
 
  const [nameFromTable, setNameFromTable] = useState(true)
  const [commentFromTable, setCommentFromTable] = useState(true)
  const [inputName, setInputName] = useState('')
  const [inputComment, setInputComment] = useState('')
  const [searchFilelds, setSearchFilelds] = useState('')

  const [editName, setEditName] = useState('')
  const [editComment, setEditComment] = useState('')

  const [countEditName, setCountEditName] = useState(0)
  const [countEditComment, setCountEditComment] = useState(0)

  let location = useLocation().pathname.split('types_of_keys/')[1];
    location = location.split('/edit')[0];


    const createtype_of_key = (id) => {

      fetch(`/api/v1/types_of_keys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          type_of_key: {name: filedName(inputName, countEditName, editName),
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
      window.location.assign('/types_of_keys')
    };

    let filedName = (inputName, countEditName, editName) => {      
      let rezult = inputName
      if (countEditName == 0) {
        rezult = editName
      } 
      return rezult
    }

    let filedComment = (inputComment, countEditComment, editComment) => {
      let rezult = inputComment
      if (countEditComment == 0) {
        rezult = editComment
      } 
      return rezult
    }


    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/type_of_key/find_for_edit?id=${location}&inputName=${inputName}&countEditName=${countEditName}&inputComment=${inputComment}&countEditComment=${countEditComment}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setNameFromTable(data["type_of_key"].inputName)
                setCommentFromTable(data["type_of_key"].inputComment)
                setEditName(data["type_of_key_edit"].name)
                setEditComment(data["type_of_key_edit"].comment)
                setloading(false)
            }
            );
    }, [searchFilelds])

    const onSearchTextChangeInputName = (e) => {
      setInputName(e.target.value);
      setSearchFilelds(e.target.value);
      setCountEditName(countEditName+1)
      if (countEditComment == 0 ) {
        setInputComment(editComment)
      }
    }

    const onSearchTextChangeInputComment = (e) => {
      setInputComment(e.target.value);
      setSearchFilelds(e.target.value);
      setCountEditComment(countEditComment+1)
      if (countEditName == 0 ) {
        setInputName(editName)
      }
    }

    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameErrorName = "text-red-600"

    let disableButton = false

    if (countEditName > 0 || countEditComment > 0) {
      if ((inputName == '' || inputComment == '') || (nameFromTable == false || commentFromTable == false) ) {
        disableButton = true
      }
    }


    if (nameFromTable)  {
      classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      classNameErrorName = "invisible"
    }

    let classCommentFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classCommentErrorName = "text-red-600"

    if (commentFromTable)  {
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
                        defaultValue={editComment}  
                    />
                    <div className={classCommentErrorName}>{t('description.error1_comment')}</div>
                </div>                        
    
          <div>
            <button
              className={classNameButton}
              disabled={disableButton}
              onClick={() => createtype_of_key(location)}
            >
               {t('description.edit_type_of_key')}
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

export default type_of_keyFormEdit;