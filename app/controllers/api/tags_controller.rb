class Api::TagsController < ApplicationController
  before_filter :require_logged_in, :only => [:create]

  def index
    @tags = Tag.all
  end
  
  def create
    @tag = Tag.new(params[:tag])

    if @tag.save
      render :create
    else
      render :status => 500
    end
  end

  def show
    @tag = Tag.includes(:taggings => :memo).where(:name => params[:id]).first
  end
end
