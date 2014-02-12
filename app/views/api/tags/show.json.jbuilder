json.(@tag, :id, :name)

json.memos do
  json.array!(@tag.taggings) do |tagging|
    memo = tagging.memo

    json.(memo, :id, :title, :body, :created_at, :updated_at, :notebook_id, :image_url, :image_big_url, :image_small_url)
  end
end