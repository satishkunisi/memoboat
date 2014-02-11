namespace :db do
  desc "Populate db with additional seed data"
  task :populate => :environment do
    ActiveRecord::Base.transaction do
      user = User.find_by_email("demo@memoboat.com")
      jokes = user.notebooks.create!(:title => "Jokes")

      joke_data = [
        {
        :title => "On swimming",
        :body => '"Swimming is not a sport. Swimming is a way to keep from drowning." - George Carlin'
       },
       {
        :title => "On boating",
        :body => '"I like to boat but I never want to be known as a boating enthusiast." - Mitch Hedberg'
       },
       {
        :title => "On sports",
        :body => '"I used to play sports. Then I realized you can buy trophies. Now I am good at everything" - Demetri Martin'
       }
      ]

      joke_memos = jokes.memos.create!(joke_data)

      humor = joke_memos.first.tags.create!(:name => "humor", :user_id => user.id)
      joke_memos[1..2].each { |memo| humor.taggings.create!(:memo_id => memo.id)}
    end
  end
end