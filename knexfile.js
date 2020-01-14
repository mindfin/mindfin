module.exports = {
    development: {
        client: 'mysql',
        connection: {
            // host : 'us-cdbr-iron-east-03.cleardb.net',
            // user : 'b98b02f7186ca5',
            // password : '264f27c4',
            // database : 'heroku_926c976eb463269',

            host: 'localhost',
            user: 'mindfin',
            password: 'mindfin!@#$%',
            database: 'mindfin',

            // host: 'localhost',
            // user: 'root',
            // password: '',
            // database: 'mindfin',

            // host : '18.224.189.191',
            // user : 'mindfin',
            // password : 'mindfin@2019',
            // database : 'mindFin',
            charset: 'utf8'
        },

        // mysql://b98b02f7186ca5:264f27c4@us-cdbr-iron-east-03.cleardb.net/heroku_926c976eb463269?reconnect=true
    }
};