class UserWithPlantsSerializer < ActiveModel::Serializer
  
  attributes :name, :bio, :photo, :address, :fav_plant, :interested_in
  has_many :plants

end
