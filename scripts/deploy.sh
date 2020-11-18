#!/bin/sh
sudo heroku login
sudo heroku container:login
sudo heroku container:push web
sudo heroku container:release web
