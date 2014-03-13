class Api::UserTagsController < ApplicationController
  before_filter :require_logged_in

  def index
    @tags = current_user.tags
  end

  def show
    @tag = Tag.find_by_name(params[:id])
    @memos = Tag.memos_by_user(params[:id], current_user)
  end
end