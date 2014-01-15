class Api::NotebooksController < ApplicationController
  before_filter :require_logged_in

  def index
    @notebooks = current_user.notebooks
    render :index
  end

  def create
  end

  def destroy
  end

  def update
  end

  def show
  end
end