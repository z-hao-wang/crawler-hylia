/*
 * Craw all songs in each albums. This will insert an entry into database but does not get the download url yet.
 */
var Crawler = require("crawler").Crawler;
var connection = require('./config').connection;
connection.connect();

var c = new Crawler({
    "maxConnections": 1,
    "callback": function(error, result, $) {
        var album_id = this.data.album_id;
        // $ is a jQuery instance scoped to the server-side DOM of the page
        $("a").each(function(index, a) {
        
            var title = $(a).html().trim();
            var url = $(a).attr('href').trim();
            if (/^http:\/\/anime.thehylia.com\/soundtracks\/album/.test(url)) {
                connection.query('INSERT IGNORE INTO `hylia`.`anime_mp3_songs`(`url`, `title`, `album_id`) VALUES (" ' + url + '", "' + title + '", "' + album_id + '")', function(err, rows, fields) {
                    if (err) throw err;
                    console.log('insert ' + url + ' ' + title + ' album_id=' + album_id);
                });
            }
        });
    }
});
/*
 * Craw all songs url based on albums in database
 */
var idFrom = 5300;
var idTo = 20000;
connection.query('SELECT * FROM `hylia`.`anime_mp3_albums` WHERE album_id >= ' + idFrom + ' AND album_id < ' + idTo, function(err, rows, fields) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        console.log('queue', rows[i].album_id, rows[i].url);
        c.queue({
            uri: rows[i].url,
            data: {
                album_id: rows[i].album_id
            }
        });
    }
});
