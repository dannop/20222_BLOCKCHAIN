class StaticsController < ApplicationController
  skip_before_action :authenticate_request
  
  def healthcheck
    render json: { success: true, version: "0.0.1" }
  end

  def terms_of_services
    path = Rails.root.join('app', 'assets', 'pdfs', 'Termos_de_Uso.pdf')
    send_file path, type: 'application/pdf', disposition: 'inline'
  end

  def privacy_policies
    path = Rails.root.join('app', 'assets', 'pdfs', 'Politica_de_Privacidade.pdf')
    send_file path, type: 'application/pdf', disposition: 'inline'
  end
end
