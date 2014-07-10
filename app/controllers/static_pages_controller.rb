class StaticPagesController < ApplicationController
  before_action :check_if_signed_in

  def root
  end
  
  private
  
  def check_if_signed_in
    redirect_to new_session_url unless logged_in?
  end
end
