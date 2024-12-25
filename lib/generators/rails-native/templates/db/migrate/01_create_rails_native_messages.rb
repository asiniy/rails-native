class CreateRailsNativeMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :rails_native_messages, id: :uuid do |t|
      t.integer :sender, null: false
      t.string :event, null: false
      t.string :raw_payload
      t.string :room, null: false
      t.integer :attempts_count, null: false, default: 0
      t.datetime :acked_at
      t.datetime :last_attempt_at

      t.timestamps(index: true)
    end
  end
end
