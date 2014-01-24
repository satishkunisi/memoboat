class Api::MemosController < ApplicationController
  before_filter :require_authorization

  def index
    @memos = current_user.memos.where(:notebook_id => params[:notebook_id])
  end

  def create
    @memo = current_user.memos.build(params[:memo])
    @memo.notebook_id = params[:memo][:notebook_id]

    if @memo.save
      render :create
    else
      render :status => 500
    end
  end

  def show
    @memo = Memo.includes(:taggings => :tag).where(:id => params[:id]).first
  end

  def update
    @memo = current_user.memos.find(params[:id])

    if @memo.update_attributes(params[:memo])
      render :update
    else
      render :status => 500
    end
  end

  def destroy
     @memo = current_user.memos.find(params[:id])
     @memo.destroy
  end

  def require_authorization

    unless current_user
      flash[:errors] = "You are not authorized to view this page"
      auth_redirect
    end

  end

end
