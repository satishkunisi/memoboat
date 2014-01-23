class Api::TaggingsController < ApplicationController
  def create
    @tagging = Tagging.new(params[:tagging]);

    if @tagging.save
      render :create
    else
      render :status => 500
    end
  end

  def show
    @tagging = Tagging.find(params[:id])
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    @tagging.destroy
  end
end