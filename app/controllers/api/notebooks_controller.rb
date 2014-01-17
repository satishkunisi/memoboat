class Api::NotebooksController < ApplicationController
  before_filter :require_logged_in

  def index
    @notebooks = current_user.notebooks
  end

  def create
    @notebook = current_user.notebooks.new(params[:notebook])

    if @notebook.save
      render :create
    else
      render :status => 500
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
  end

  def update
    @notebook = Notebook.find(params[:id])

    if @notebook.update_attributes(params[:notebook])
      render :update
    else
      render :status => 500
    end
  end

  def show
    @notebook = Notebook.find(params[:id])

    if @notebook
      render :show
    else
      render :status => 500
    end
  end
end