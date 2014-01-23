json.(@memo, :id, :title, :body, :notebook_id, :created_at, :updated_at)

json.tags do
  json.array!(@memo.tags) do |tag|
    tagging = @memo.taggings.where(:tag_id => tag.id).first

    json.(tag, :id, :name)
    json.tagging(tagging, :id)
  end
end