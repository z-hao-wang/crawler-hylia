/*
 * This will download all mp3 media files marked as to_download = 1 in db
 * Hylia limit users to single thread. we we have to queue next download on finishing previous downloading
 *
 */
var Crawler = require("crawler");
var config = require('./config');
var connection = config.connection;
var sys = require('sys');
spawn = require('child_process').spawn,
    connection.connect();
//convert to a valid file name.
String.prototype.toFileName = function(str) {
    return this.replace('&amp;', '').replace(/([!@#$%^&*()\?])/g, '');
}

var c = new Crawler({
    "maxConnections": 1,
    "callback": function(error, result, $) {
        var song_id = this.data.song_id;
        var album_title = this.data.album_title;
        function handleError() {
          console.log('error for song id=' + song_id);
          connection.query('UPDATE `anime_mp3_songs` SET to_download = 0 WHERE id=' + song_id, function () {
            queueNext();
          });
        }
        // $ is a jQuery instance scoped to the server-side DOM of the page
        var els = $("#content_container table.blog a");
        if (els.length == 0) { //empty result. just do next and skip current
            song_id
            console.log('error empty result for song id=' + song_id);
            handleError();
            return;
        }
        var counter = 0;
        els.each(function(index, a) {
            var title = $(a).html().trim();
            var url = $(a).attr('href').trim();
            counter++;
            if (/^Download to Computer/.test(title)) {
                //start downloading the link
                console.log('started downloading: ' + url);
                wget = spawn('wget', ['-P', config.base_directory + album_title + '/', '-N', url]);
                wget.stdout.on('data', function(data) {
                    if (data.length > 2) {
                        console.log('stdout: ' + data);
                    }
                });
                var current_percent = 0;
                wget.stderr.on('data', function(data) {
                    //console.log('data.toString()', typeof(data.toString()), data.toString());
                    if (data.toString().length > 3 && typeof(data.toString()) == 'string') {
                        var matches = data.toString().match(/(\d+)%/);
                        if (matches && matches[1]) {
                            var new_percent = parseInt(matches[1]);
                            if (new_percent > current_percent + 10) {
                                current_percent = new_percent;
                                process.stdout.write("Downloading " + data + " \r");
                            }
                        }
                    }
                });
                wget.on('exit', function(code) {
                    //Update the download url (mp3_url)
                    //Setting mp3_url also means it's already downloaded. Thus it will be skipped in the future.
                    connection.query('UPDATE `hylia`.`anime_mp3_songs` SET `mp3_url` = "' + url + '" WHERE `id` = ' + song_id, function(err, rows, fields) {
                        if (err) throw err;
                        console.log('finished downloading: ' + url);
                        queueNext();
                    });
                });
                return false; //end the each loop
            } else if (counter == els.length) {
                //we did not found a download link. 
                //queue next
                handleError();
            }
        });
    }
});

function queueNext() {
    connection.query('SELECT `anime_mp3_songs`.*, `anime_mp3_albums`.title as album_title FROM `anime_mp3_songs` LEFT JOIN `anime_mp3_albums` ON `anime_mp3_albums`.album_id = `anime_mp3_songs`.album_id WHERE `anime_mp3_songs`.to_download = 1 AND `anime_mp3_songs`.mp3_url = "" LIMIT 1', function(err, rows, fields) {
        if (err) throw err;
        if (rows.length == 0) {
            console.log('All done');
            process.exit(); //exit if no more downloads 
        }
        for (var i = 0; i < rows.length; i++) {
            var album_title = rows[i].album_title.toFileName();
            console.log("queue url: " + rows[i].url.trim() + " id: " + rows[i].id + ' album_id:' + rows[i].album_id);
            c.queue({
                uri: rows[i].url.trim(),
                data: {
                    song_id: rows[i].id,
                    album_title: album_title
                }
            });
        }
    });
}
queueNext();
