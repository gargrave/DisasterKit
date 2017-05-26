# DisasterKit

A small app to help us manage emergency supplies. Any well-prepared household should have enough food, water, and supplies to last a few days in the case of a major emergency, but the downside of this is that it gives you a lot of expiration dates to keep track of, so you can replace said food when necessary.

I built this app to help my wife and me keep track of all of our supplies and send us weekly email reminders with a list of what needs to be consumed and replaced.

The was the first Django app that I actually pushed into production, and it worked well, but I have certainly come a long way since this time and at this point, it is mostly just here for archiving purposes.

Built with Django 1.8 and AngularJS 1.4, and deployed to Heroku. The biggest issue was that I built the entire stack as a single project, so even minor changes to the front end code required a full redeployment, which became a bit of a pain to manage. The project structure is also a little awkward to navigate, since all of the front end Angular code is nested within the Django app. Lesson learned: multi-tier deployment FTW.
