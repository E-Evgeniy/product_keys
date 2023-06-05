# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

TypesOfKey.create(name: 'standart', comment: 'поддерживает ограничение по
    времени, требует проверки хеша на сервере лицензий при каждом
     запуске. Не поддерживает возможность работы с порталом через
      логин-пароль')

TypesOfKey.create(name: 'portal', comment: 'поддерживает ограничение по
времени. Предназначен исключительно для работы через портал
 (через логин-пароль)')

TypesOfKey.create(name: 'local', comment: 'бессрочные ключи не требующие
постоянного подключения для проверки к серверу, не поддерживают
 работу с порталом')

User.create(first_name: 'Admin',
            email: 'admin@admin.ru',
            password: 123456,
            password_confirmation: 123456)
