class Api::SearchesController < ApplicationController
  def show
    @memos = Memo.search(params[:id]).results

    if @memos.empty?
      render :internal_server_error
    else
      render :show
    end
  end
end