class ContactMailer < ApplicationMailer
  default to: 'cyrillsemah@gmail.com'
  
  def new_contact_notification(contact)
    @contact = contact
    mail(
      subject: "Nouveau message de contact de #{@contact.nom}",
      from: "Site Web <noreply@example.com>"
    )
  end
end