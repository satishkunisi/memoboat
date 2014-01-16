Memoboat::Application.routes.draw do
  resources :users
  resource :session

  namespace :api, :defaults => {:format => :json} do 
    resources :notebooks, :except => [:new, :edit] do 
      resources :memos, :except => [:new, :edit]
    end
  end
  
end

#get list of notebooks
#get all memos in notebook
#create, update, destroy memo
#show action form notebook, has all the memos
#create an empty entries collection, in parse method of notebook model
