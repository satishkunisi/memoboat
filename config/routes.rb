Memoboat::Application.routes.draw do
  resources :users
  resource :session

  root to: "static_pages#root"

  get '/demo', to: "static_pages#demo"
  get '/api/search/:id', to: "api::searches#show"

  namespace :api, :defaults => {:format => :json} do
    resources :notebooks, :except => [:new, :edit] do 
      resources :memos, :only => [:index] do
        resources :tags, :only => [:index], :controller => "memo_tags" 
      end
    end

    resources :tags, :except => [:new, :edit] do
      resources :taggings, :only => [:index]
    end
    
    resources :memos, :except => [:new, :edit]
    resources :taggings, :except => [:new, :edit, :index]
    resource :feed, :only => [:show]
  end
  
end

