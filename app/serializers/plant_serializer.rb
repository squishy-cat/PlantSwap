class PlantSerializer < ActiveModel::Serializer

  attributes :id, :common_name, :latin_name, :picture, :phase, :care_instructions, :pet_safe, :user_id

end
