# frozen_string_literal: true

# Model for key types
class TypesOfKey < ApplicationRecord
  has_many :product_keys, dependent: :destroy
  validates :name, :comment, presence: true

  def self.create_types_of_keys
    # TypesOfKeysTable.create_types_of_keys
    TypesOfKey.create(name: "standart", comment: "поддерживает ограничение по
             времени, требует проверки хеша на сервере лицензий при каждом
              запуске. Не поддерживает возможность работы с порталом через
               логин-пароль")

    TypesOfKey.create(name: "portal", comment: "поддерживает ограничение по
         времени. Предназначен исключительно для работы через портал
          (через логин-пароль)")

    TypesOfKey.create(name: "local", comment: "бессрочные ключи не требующие
         постоянного подключения для проверки к серверу, не поддерживают
          работу с порталом")
  end
end
