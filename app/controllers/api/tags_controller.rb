class Api::TagsController < ApplicationController
  def index
    @tags = current_user.tags
  end
  
  def create
    user_id = current_user.id

    @tag = current_user.tags.build(params[:tag])

    if @tag.save
      render :create
    else
      render :status => 500
    end
  end

  def show
    @tag = Tag.includes(:taggings => :memo).where(:id => params[:id]).first
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
  end 
end
