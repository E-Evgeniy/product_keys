import React from "react";
import { useTranslation } from 'react-i18next';

export default function UpperElements() {
    const { t } = useTranslation();
    const classNameUpElement = "text-gray-700 hover:text-indigo-600 text-md "
    return (
        <div>
            <header>
                <nav className="shadow">

                    <div className="flex justify-between items-center py-6 px-10 container mx-auto">

                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-tr from-indigo-600 to-green-600 bg-clip-text text-transparent hover:cursor-pointer">Сервер лицензий</h1>
                        </div>
                        <div>
                            
                            <div className="flex items-center">

                                <ul className="sm:flex space-x-4 hidden items-center">
                                    <li><a href="/" className={classNameUpElement}> {t('description.main')} </a></li>
                                    <li><a href="/clients" className={classNameUpElement}> {t('description.clients')} </a></li>
                                    <li><a href="#" className="text-gray-700 hover:text-indigo-600 text-md ">Ключи</a></li>
                                    
                                </ul>

                                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                                    <h1 className="text-text-gray-600  py-2 hover:cursor-pointer hover:text-indigo-600">WELCOME</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above
