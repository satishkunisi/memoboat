# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do 
  u = User.create!(email: 'demo@memoboat.com', password: 'demoboat')
  notebook = u.notebooks.first

  memos = [ {title: 'Welcome to MemoBoat!', 
             body: 'MemoBoat is an Evenote-inspired, cloud note-taking app. 
                   It features drag and drop and auto-saving.'},
            {title: 'Auto-saving', 
             body: 'MemoBoat uses _.debounce to auto-save notes as you type'},
            {title: 'Drag and Drop',
             body: 'You can drag and drop memos into different notebooks and tags on to memos.'}
          ]

  notebook.memos.create!(memos)
end