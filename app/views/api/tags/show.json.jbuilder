json.(@tag, :id, :name)

json.memos do
  json.array!(@tag.taggings) do |tagging|
    memo = tagging.memo

    json.(memo, :id, :title, :body, :created_at, :updated_at)
  end
end