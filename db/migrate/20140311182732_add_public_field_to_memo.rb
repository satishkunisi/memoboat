class AddPublicFieldToMemo < ActiveRecord::Migration
  def change
    add_column :memos, :public, :boolean, :default => :false
  end
end
