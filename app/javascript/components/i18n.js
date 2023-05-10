
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28

	

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            description: {
                menu: 'МЕНЮ',
                new_client: 'Новый клиент',
                main: 'На главную',
                exit: 'Выйти',
                clients: 'Клиенты',
                client: 'Клиент',
                loading: 'Загрузка',
                name: 'Имя',
                email: 'Почта',
                comment: 'Комментарий',
                date_created: 'Дата регистрации',
                new_key: 'Новый ключ',
                error1_name: 'Данное имя уже используется',
                error1_email: 'Данная почта уже используется',
                input_comment:'Введите комментарий',
                create_client: 'Создать клиента',
                actions: 'Действия',
                delete: 'Удалить',
                edit: 'Изменить',
                edit_client: 'Редактировать клиента',
                types_of_keys: 'Типы ключей',
                cilent_new: 'Новый клиент',
                report:'Отчёт об изменениях',
                new_types_of_keys: 'Новый тип ключа',
                error1_comment: 'Данный комментарий уже существует',
                type_of_key: 'Тип ключа',
                edit_type_of_key: 'Редактировать тип ключа',
                create_type_of_key: 'Создать новый тип ключа',
                active_keys: 'Активные ключи',
                all_keys: 'Всего ключей'

              }
          // here we will place our translations...
        }
      }
    }
  });

export default i18n;