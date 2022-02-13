class UserWithPlantsSerializer < ActiveModel::Serializer
  
  attributes :name, :bio, :photo, :address, :fav_plant, :interested_in, :id
  has_many :plants

end
