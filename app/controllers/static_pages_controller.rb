class StaticPagesController < ApplicationController
  before_filter :require_logged_in, :only => [:root]

  def root
  end

  def demo
  end
end
