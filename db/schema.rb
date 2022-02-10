# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_09_190227) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "plants", force: :cascade do |t|
    t.string "common_name"
    t.string "latin_name"
    t.string "picture"
    t.string "phase"
    t.string "care_instructions"
    t.string "pet_safe"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "listed", default: false
    t.index ["user_id"], name: "index_plants_on_user_id"
  end

  create_table "trade_listings", force: :cascade do |t|
    t.string "location"
    t.boolean "mail", default: true
    t.string "trade_for"
    t.bigint "plant_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["plant_id"], name: "index_trade_listings_on_plant_id"
    t.index ["user_id"], name: "index_trade_listings_on_user_id"
  end

  create_table "trade_offers", force: :cascade do |t|
    t.bigint "plant_wanted_id"
    t.bigint "plant_offered_id"
    t.boolean "accepted", default: false
    t.boolean "complete", default: false
    t.bigint "trade_listing_id", null: false
    t.bigint "offer_from_id"
    t.bigint "offer_to_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["offer_from_id"], name: "index_trade_offers_on_offer_from_id"
    t.index ["offer_to_id"], name: "index_trade_offers_on_offer_to_id"
    t.index ["plant_offered_id"], name: "index_trade_offers_on_plant_offered_id"
    t.index ["plant_wanted_id"], name: "index_trade_offers_on_plant_wanted_id"
    t.index ["trade_listing_id"], name: "index_trade_offers_on_trade_listing_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.text "bio"
    t.string "address"
    t.string "photo"
    t.string "fav_plant"
    t.string "interested_in"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.string "email"
  end

  add_foreign_key "plants", "users"
  add_foreign_key "trade_listings", "plants"
  add_foreign_key "trade_listings", "users"
  add_foreign_key "trade_offers", "plants", column: "plant_offered_id"
  add_foreign_key "trade_offers", "plants", column: "plant_wanted_id"
  add_foreign_key "trade_offers", "trade_listings"
  add_foreign_key "trade_offers", "users", column: "offer_from_id"
  add_foreign_key "trade_offers", "users", column: "offer_to_id"
end
