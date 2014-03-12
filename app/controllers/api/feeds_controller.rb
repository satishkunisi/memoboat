class Api::FeedsController < ApplicationController
  def show
    @memos = Memo.includes(:taggings => :tag).where(:public => true)
  end
end