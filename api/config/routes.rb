Rails.application.routes.draw do
  # devise_for :users

  resource :static do
    get :healthcheck
    get :terms_of_services
    get :privacy_policies
  end

  resource :authentication do
    get :find_user
    post :google
    post :reset_code
    post :reset_password
  end

  resources :users, only: :index
end
