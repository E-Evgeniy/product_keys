# frozen_string_literal: true

# Model for ProductKeys
class ProductKey < ApplicationRecord
  include OperationsWithKey

  belongs_to :client, optional: true
  belongs_to :types_of_key
  validates :name, presence: true, uniqueness: true

  scope :name_exist, ->(name) { where(name:) }

  def create
    product_key = ProductKey.new
    product_key.name = OperationsWithKey.generate_name
  end
end
