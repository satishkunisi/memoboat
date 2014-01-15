Memoboat::Application.routes.draw do
  resources :users
  resource :session

  namespace :api, :defaults => {:format => :json} do 
    resources :notebooks
  end
end
