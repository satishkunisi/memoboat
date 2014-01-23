Memoboat::Application.routes.draw do
  resources :users
  resource :session

  root to: "static_pages#root"

  namespace :api, :defaults => {:format => :json} do
    # <form>
    # <input type="hidden" name="memo[note_id]" value="<%= note.get("id" %>">
    # </form>

    # notes show
    # > note's memos index !show (index, !create, !!!show, !!!update, !!!destroy)

    # memos show, create
    # > memo's tags index

    # tags index

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
  end
  
end

#get list of notebooks
#get all memos in notebook
#create, update, destroy memo
#show action form notebook, has all the memos
#create an empty entries collection, in parse method of notebook model
