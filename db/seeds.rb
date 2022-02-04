# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating data!"

user = User.create(
    name: "Eve",
    bio: "I love plants!",
    address: "Brooklyn, NY",
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-curled-up-sleeping-1593184773.jpg",
    fav_plant: "Tomato, Orchids",
    interested_in: "Orchids and Peppers",
    password: "123"
)

plant = Plant.create(
    common_name: "Purple Passion",
    latin_name: "Gynura aurantiaca",
    picture: "https://upload.wikimedia.org/wikipedia/commons/8/80/Gynura_aurantiaca.jpg",
    phase: "Rooted cutting",
    care_instructions: "Likes bright morning light and lots of water",
    pet_safe: "Cats and Dogs",
    user_id: 1
)

TradeListing.create(
    location: "Brooklyn, NY",
    mail: true,
    trade_for: "Any orchid!",
    plant_id: 1,
    user_id: 1
)

puts "Data creation complete!"