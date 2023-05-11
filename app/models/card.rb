class Card < ApplicationRecord
  acts_as_list scope: :list

  belongs_to :list

  scope :sorted, ->{ order(position: :asc) }

  validates :name, presence: true
end
