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
                all_keys: 'Всего ключей',
                volume_keys: 'Количество необходимых лицензий',
                volume_days: 'Срок действия лицензии в днях',
                infinite_key: 'Сделать ключ бессрочным',
                yes: 'Да',
                no: 'Нет',
                select_type_key: 'Выберите тип ключа',
                create_product_key: 'Создать',
                create_key_for_client: 'Создание лицензии для ',
                error1_volume_keys: 'Количество лицензий должно быть целым числом и больше нуля',
                error1_duration_keys: 'Срок действия должен быть целым числом и больше нуля',
                product_keys: 'Ключи',
                day_end_key: 'Дней до дезактивации',
                key_status: 'Статус ключа',
                no_active: 'Не активен',
                active: 'Активен',
                infiniteKey: 'Бесконечный срок действия',
                product_key_edit: 'Редактирование ключа',
                client_name: 'Имя клиента',
                error2_name_keys: 'Такого клиента не существует',
                product_keys_client: 'Ключи клиента ',
                get_free_key: 'Дать свободный ключ',
                save: 'Сохранить',
                get_infinite_keys: 'Только бессрочные ключи',
                status: 'Статус',
                all: 'Все',
                no_active_keys_arr: 'Не активные',
                active_keys_arr: 'Активные',
                delete_client: 'Вы хотите удалить клиента',
                delete_and_key: 'со всеми его ключами',
                delete_key: 'Вы хотите удалить ключ',
                delete_type_of_key: 'Вы хотите удалить тип ключа',
                cancel: 'Отмена'
                

              }
          // here we will place our translations...
        }
      }
    }
  });

export default i18n;