json.array! @memos do |memo|
  json.partial!("memo", memo: memo)
end