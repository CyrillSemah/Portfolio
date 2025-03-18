class Contact < ApplicationRecord
  validates :civilite, presence: true
  validates :nom, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :message, presence: true
end