class ChangeMemoBodyToText < ActiveRecord::Migration
  def up
    change_column :memos, :body, :text
  end
  def down
    change_column :memos, :body, :string
  end
end
