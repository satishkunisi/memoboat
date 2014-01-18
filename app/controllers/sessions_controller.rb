class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid credentials."]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
