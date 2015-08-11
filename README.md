crawler-hylia
=============

Crawer of http://anime.thehylia.com/soundtracks

Usage
=============
1. Set up local/remote mysql database using hylia.sql. Rename config.sample.js to config.js and update the configs.
2. ```npm install git://github.com/z-hao-wang/node-crawler.git```
3. set up config.js for directory info and database credentials.
4. run ```node craw_albums.js ``` to grab all albums. 
5. run ```node craw_songs.js``` to grab all songs
6. mark in database what do you want to download
7. run ```node download_mp3.js``` to download all files marked in step 5

hylia-browser
=============
The browser is based on PHP code igniter and grocery crud. A cheap simple implementation. You can setup the website on any http server. The website allows you to browse songs and mark them download easily.
