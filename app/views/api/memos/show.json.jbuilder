json.(@memo, :id, :title, :body, :notebook_id, :created_at, :updated_at, :notebook_id)

json.tags do
  json.array!(@memo.taggings) do |tagging|
    tag = tagging.tag

    json.(tag, :id, :name)
    json.tagging(tagging, :id)
  end
end