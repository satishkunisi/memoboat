module SessionsHelper
  def current_user
    @current_user = User.find_by_session_token(session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !current_user.nil?
  end

  def logged_out?
    current_user.nil?
  end

  def require_logged_in
    redirect_to new_session_url if logged_out?
  end

  def require_logged_out
    redirect_to root_url if logged_in?
  end

  def auth_redirect
    if logged_in?
      redirect_to user_url(current_user) 
    else
      redirect_to new_session_url
    end
  end

  def require_authorization
    owner = User.find(params[:id])
    auth_redirect
  end
end
