# WebTTT

WebTTT is a simple implementation of Tic Tac Toe intended to be playable on a Github profile!

### Getting started
First, you need to start the server application on your webserver:

`git clone https://github.com/j-weissen/webttt`

`docker build -t webttt .`

`docker run -p "<port>:3000" webttt`

Copy the contents of `index.html.example` to where you want to display the game, replacing `{client-url}` to the web address of where the game is displayed and `{server-url}` to the URL of your Server
