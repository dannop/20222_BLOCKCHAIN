class ApplicationController < ActionController::API
  include JsonWebToken
  include ApplicationHelper
  
  before_action :only_json
  before_action :authenticate_request
  # before_action :set_paper_trail_whodunnit

  private
    def only_json
      render json: {message: "Formato de requisição não aceito"}, status: :unauthorized unless request.format.json?
    end

    def authenticate_request
      header = request.headers["Authorization"]
      header = header.split(" ").last if header
      return render json: {message: "Requisição inválida"}.to_json if header.nil?
      
      decoded = jwt_decode(header)
      @current_user = User.find(decoded[:user_id])
    end

    # Método exigido pelo Papertrail
    # def current_user 
    #   current_user ||= @current_user
    # end
end
