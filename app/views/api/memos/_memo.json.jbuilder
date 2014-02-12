json.(memo, :id, :title, :body, :notebook_id, 
            :created_at, :updated_at, :notebook_id, :image_big_url, :image_small_url, :image_url)

json.tags do
  json.array!(memo.tags) do |tag|
    json.(tag, :id, :name)
  end
end