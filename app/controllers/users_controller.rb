class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      login!(@user)
      flash[:notices] = "Welcome to MemoBoat!"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  def update
  end

  def edit
  end

  def destroy
  end
end
