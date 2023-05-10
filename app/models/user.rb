# frozen_string_literal: true

# Model for users
class User < ApplicationRecord
  validates :first_name, presence: true
end