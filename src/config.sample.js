/* mysql settings */
module.exports = (function() {
    var mysql = require('mysql');
    var _connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hylia',
        port: 3306
    });
    return {
        connection: _connection,
        base_directory: '/contents_no_bak/hylia/'
    };
})();
