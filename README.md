crawler-hylia
=============

Crawer of http://anime.thehylia.com/soundtracks

Usage
=============
1. Set up local/remote mysql database using hylia.sql
2. set up config.js for directory info and database credentials.
3. run ```node craw_albums.js ``` to grab all albums. 

4. run ```node craw_songs.js``` to grab all songs

5. mark in database what do you want to download
6. run ```node download_mp3.js``` to download all files marked in step 5
