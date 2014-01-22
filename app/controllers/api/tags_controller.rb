class Api::TagsController < ApplicationController
  def index
    @tags = current_user.tags
  end
  
  def create
    memo_id = params[:memo_id]
    user_id = current_user.id

    @tag = Tag.new(params[:tag])
    @tag.taggings.build(:memo_id => memo_id)

    if @tag.save
      render :create
    else
      render :status => 500
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
  end 
end
