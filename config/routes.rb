Rails.application.routes.draw do
  get 'users/show'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'
   get 'login', to: 'sessions#login', as: 'login'

  resources :sessions, only: [:create, :destroy]
  resources :user, only: [:index]
  post 'users/create_event'
  root to: "users#index"

  resources :events
end