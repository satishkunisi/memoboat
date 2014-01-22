class Api::MemoTagsController < ApplicationController
  before_filter :require_logged_in

  def index
    memo = Memo.find(params[:memo_id])
    @tags = memo.tags
  end

end