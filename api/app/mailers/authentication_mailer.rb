class AuthenticationMailer < ApplicationMailer
  def reset_password(reset_password_code)
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
