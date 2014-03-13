json.id(@query)

json.memos do
  json.array!(@memos) do |memo|
    json.(memo, :id, :title, :body, :created_at, :updated_at, 
                             :notebook_id, :image_big_url, :image_small_url, :public)
  end
end