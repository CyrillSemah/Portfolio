class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  
  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      # Send email notification
      ContactMailer.new_contact_notification(@contact).deliver_now
      
      render json: { success: true, message: "Votre message a été envoyé avec succès!" }, status: :created
    else
      render json: { success: false, errors: @contact.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def contact_params
    params.permit(:civilite, :nom, :prenom, :societe, :email, :message)
  end
end