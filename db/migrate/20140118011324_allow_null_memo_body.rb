class AllowNullMemoBody < ActiveRecord::Migration
  def change
    change_column :memos, :body, :string, :null => true
  end
end
