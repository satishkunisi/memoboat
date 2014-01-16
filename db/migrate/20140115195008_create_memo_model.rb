class CreateMemoModel < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :title, :null => false
      t.text :body, :null => false
      t.integer :notebook_id, :null => false

      t.timestamps
    end

    add_index :memos, [:notebook_id, :title]
  end
end
