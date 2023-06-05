# frozen_string_literal: true

# Controller the API UserssController
module Api
  module V1
    # UsersController
    class UsersController < BaseController
      def user_destroy_session
        reset_session
        redirect_to root_path
      end
    end
  end
end
