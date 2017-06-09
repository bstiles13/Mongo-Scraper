An app that lets users leave comments on the latest news from BBC Earth. Mongoose and Cheerio are used to scrape and display news from BBC.

Flow:

A user visits the page and the app shows any stories stored in MongoDB from prior scrapes (or visits). The user can click 'Scrape' to scrape for any new articles. Mongoose schema validation checks for duplicates and updates Mongo with any new stories.

All users can leave comments on the stories. They can delete any comments they want removed. Stored comments are visible to every user.

Mongoose's model system and populate method is used to associate comments (a table) with particular articles (another table).
