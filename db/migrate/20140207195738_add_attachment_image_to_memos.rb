class AddAttachmentImageToMemos < ActiveRecord::Migration
  def self.up
    change_table :memos do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :memos, :image
  end
end
