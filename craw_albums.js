/*
 * Craw all albums and save into database
 */
var Crawler = require("crawler").Crawler;
var connection = require('./config').connection;
connection.connect();

var c = new Crawler({
  "maxConnections":10,

  // This will be called for each crawled page
  "callback":function(error,result,$) {

      // $ is a jQuery instance scoped to the server-side DOM of the page
      $("#content_container table.blog p[align='left'] a").each(function(index, a) {
        var title = $(a).html().trim();
        var url = $(a).attr('href').trim();
        
        connection.query('INSERT IGNORE INTO `hylia`.`anime_mp3_albums`(`url`, `title`) VALUES (" ' + url + '", "' + title + '")', function(err, rows, fields) {
          if (err) throw err;
          console.log('insert', url, title);
        });
      });
  }
});

// Queue all URLs by letter
for(var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  c.queue("http://anime.thehylia.com/soundtracks/browse/" + String.fromCharCode(i));
}