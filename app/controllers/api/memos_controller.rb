class Api::MemosController < ApplicationController
  before_filter :require_valid_notebook
  before_filter :require_authorization

  def index
    @memos = Memo.where(:notebook_id => params[:notebook_id])
  end

  def create
    @memo = Memo.new(params[:memo])
    @memo.notebook_id = params[:notebook_id]

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
  end

  def require_authorization
    notebook_owner = @notebook.user

    unless current_user == notebook_owner
      flash[:errors] = "You are not authorized to view this page"
      auth_redirect
    end

  end

  def require_valid_notebook
    @notebook = Notebook.find(params[:notebook_id])

    unless @notebook
      flash[:errors] = "Invalid Request."
      auth_redirect
    end

  end
end
