#!/bin/sh
heroku login
git push heroku master
heroku run yarn prisma:migrate
