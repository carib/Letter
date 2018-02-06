Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :spots, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resource :user, only: [:create, :show]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
