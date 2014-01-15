json.array! @notebooks do |notebook|
  json.id notebook.id
  json.title notebook.title
  json.created_at notebook.created_at
  json.updated_at notebook.updated_at
end