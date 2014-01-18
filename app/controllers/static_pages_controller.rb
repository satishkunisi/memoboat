class StaticPagesController < ApplicationController
  before_filter :require_logged_in, :only => [:root]

  def root
  end
end
