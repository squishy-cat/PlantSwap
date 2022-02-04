class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :bio, :address, :photo, :fav_plant, :interested_in

end
