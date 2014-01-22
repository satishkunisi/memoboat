class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id
      t.integer :memo_id
    end

    add_index :taggings, :tag_id
    add_index :taggings, :memo_id
  end
end
