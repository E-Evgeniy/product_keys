import React, { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';

const ProductKeyForm = (props) => {
    const { t } = useTranslation();

    const [loading, setloading] = useState(true)
    const [loadedTypesOfKeys, setLoadedTypesOfKeys] = useState([])
    const [value, setValue] = useState('');
    const [inputVolumeKeys, setInputVolumeKeys] = useState(1)
    const [inputDuration, setInputDuration] = useState(1)
    const [inputComment, setInputComment] = useState('')
    const [inputInfiniteKey, setInputInfiniteKey] = useState(false);

    const [searchFilelds, setSearchFilelds] = useState('')

    const options = loadedTypesOfKeys.map((typeKey, index) => {
        return <option key={index}>{typeKey}</option>;
    });

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/v1/type_of_key/names_types_keys"

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedTypesOfKeys(data["names_types_of_keys"])
                setloading(false)
            }
            );
    }, [loading])

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/product_key/check_fields?inputVolumeKeys=${inputVolumeKeys}&inputDurationKeys=${inputDuration}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data) 
                console.log('dddddd')        
                setloading(false)
            }
            );
    }, [searchFilelds])

    const createProductKey = () => {

        fetch(`/api/v1/product_keys/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            productKey: {
                volumeKeys: inputVolumeKeys,
                duration: inputDuration,
                infiniteKey: inputInfiniteKey,
                typeKey: inputTypeKey,
                comment: inputComment, 
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
        setloading(true)
        window.open('/clients')
      };

      const onChangeInputVolumeKeys = (e) => {
        setInputVolumeKeys(e.target.value);
        setSearchFilelds(e.target.value);
      }
  
      const onChangeInputDuration = (e) => {
        setInputDuration(e.target.value);
        setSearchFilelds(e.target.value);
      }

      
      function changeCheckbox() {
        setInputInfiniteKey(!inputInfiniteKey);
     }

      const onSearchTextChangeInputComment = (e) => {
        setInputComment(e.target.value);
      }

    const loadingSection = (<div>{t('description.loading')}</div>)

    let classNameButton = "hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none disabled:opacity-75"

    const dataSection = (

        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <div className="-mx-3 flex flex-wrap">
                    <div className="mb-5 w-full px-3 sm:w-2/3">
                        <label
                            htmlFor="fVolumeKeys"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            {t('description.volume_keys')}
                        </label>
                        <input
                            type="number"
                            name="fVolumeKeys"
                            id="fVolumeKeys"
                            placeholder={t('description.volume_keys')}
                            min="1"
                            defaultValue={1}
                            onChange={onChangeInputVolumeKeys}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                </div>
                <br></br>
                <div className="-mx-3 flex flex-wrap">
                    <div className="mb-5 w-full px-3 sm:w-2/3">
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
                            min="1"
                            defaultValue={1}
                            onChange={onChangeInputDuration}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                </div>
                <br></br>
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
                        <select className="p-1 px-2 outline-none w-2/3 bg-white" value={value} onChange={(event) => setValue(event.target.value)}>
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
                            onChange={onSearchTextChangeInputComment}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                </div>
                <br></br>

                <div>
                    <button
                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        onClick={() => createProductKey()}
                    >
                        {t('description.create_product_key')}
                    </button>
                </div>
            </div>
        </div>
    )



    if (loading) {
        return dataSection
    } else {
        return dataSection
    }


}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

export default ProductKeyForm;