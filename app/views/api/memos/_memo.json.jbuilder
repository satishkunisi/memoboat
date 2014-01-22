json.(memo, :id, :title, :body, :notebook_id, :created_at, :updated_at)

json.tags do
  json.array!(memo.tags) do |tag|
    json.(tag, :id, :name)
  end
end