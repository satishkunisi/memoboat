class Api::MemosController < ApplicationController
  before_filter :require_authorization

  def index
    @memos = Memo.where(:notebook_id => params[:notebook_id])
    render :index
  end

  def create
    @memo = Memo.new(params[:memo])

    if @memo.save
      render :create
    else
      render :status => 500
    end
  end

  def show
    @memo = Memo.find(params[:id])
  end

  def update
    @memo = Memo.find(params[:id])

    if @memo.update_attributes(params[:memo])
      render :update
    else
      render :status => 500
    end
  end

  def destroy
     @memo = Memo.find(params[:id])
     @memo.destroy!
     render :destroy
  end

  def require_authorization
    notebook_owner = Notebook.find(params[:notebook_id]).user

    unless current_user == notebook_owner
      flash[:errors] = "You are not authorized to view this page"
      if logged_in?
        redirect_to user_url(current_user) 
      else
        redirect_to new_session_url
      end
    end

  end
end
