# frozen_string_literal: true

# Model for clients
class Client < ApplicationRecord
  has_many :product_keys, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
