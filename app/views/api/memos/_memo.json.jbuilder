json.(memo, :id, :title, :body, :notebook_id, :created_at, :updated_at, :notebook_id)

json.tags do
  json.array!(memo.tags) do |tag|
    json.(tag, :id, :name)
  end
end