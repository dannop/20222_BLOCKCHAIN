class AuthenticationsController < ApplicationController
  skip_before_action :authenticate_request

  def create
    @user = User.find_by_email(params[:email])
    
    if @user.nil?
      render json: {message: "Usuário não encontrado."}, status: :unauthorized
    else
      if @user.valid_password?(params[:password])
        token = jwt_encode(user_id: @user.id)
        render json: {data: {email: @user.email, token: token}}, status: :ok
      else
        render json: {message: "Senha inválida."}, status: :unauthorized
      end
    end    
  end

  def reset_password
    @user = User.find_by(email: params[:email])
    raw, hashed = Devise.token_generator.generate(User, :reset_password_token)
    
    @user.reset_password_token = hashed
    @user.reset_password_sent_at = Time.now.utc
    @user.save
    
    render json: {message: "E-mail com instruções enviado com sucesso!"}, status: :ok
  end
end