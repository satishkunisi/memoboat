class Api::SearchesController < ApplicationController
  def show
    @query = params[:id]
    @memos = current_user.memos.search_text(@query)

    if @memos.empty?
      render :internal_server_error
    else
      render :show
    end
  end
end