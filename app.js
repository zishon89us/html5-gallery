
/**
 * Angular-Passport-Express
 * */

var express = require('express'),
    path = require('path'),
    app = module.exports = express(),
    routes = require('./config/routes'),
    passport = require('passport'),
    env = process.env.NODE_ENV || 'development',
    mongoose = require('mongoose'); 

// Configuration
app.configure(function() {
    app.config = require('./config/config')[env];
    app.set('port', process.env.PORT || 3000);
    app.engine('html', require('ejs').renderFile);
    app.set('views', path.join(__dirname ,'app','views'));
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());    
    app.use(express.session({ secret: 'ultrazone' }));
    app.use(express.static(path.join( __dirname,'/app')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    app.server = require('http').createServer(app);
  });


/*var decodeStreamMap = function(url_encoded_fmt_stream_map) {
    var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
    sources = {};
    _ref = url_encoded_fmt_stream_map.split(",");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        urlEncodedStream = _ref[_i];
        stream = decodeQueryString(urlEncodedStream);
        type = stream.type.split(";")[0];
        quality = stream.quality.split(",")[0];
        stream.original_url = stream.url;
        stream.url = "" + stream.url + "&signature=" + stream.sig;
        sources["" + type + " " + quality] = stream;
    }
    return sources;
}

var decodeQueryString = function(queryString){

    var key, keyValPair, keyValPairs, r, val, _i, _len;
    r = {};
    keyValPairs = queryString.split("&");
    for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
        keyValPair = keyValPairs[_i];
        key = decodeURIComponent(keyValPair.split("=")[0]);
        val = decodeURIComponent(keyValPair.split("=")[1] || "");
        r[key] = val;
    }
    return r;

}*/


//var request = require('request');
/*request('http://www.youtube.com/get_video_info?video_id=q0Pz3332x8U', function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var video;
        video = decodeQueryString(body);
        if (video.status === "fail") {
            //return callback(video);
            console.log('---------------------------');
            console.log('-----------Failed Video----');
            console.log('---------------------------');
        }
        video.sources = decodeStreamMap(video.url_encoded_fmt_stream_map);
        video.getSource = function(type, quality) {
            var exact, key, lowest, source, _ref;
            lowest = null;
            exact = null;
            _ref = this.sources;
            for (key in _ref) {
                source = _ref[key];
                if (source.type.match(type)) {
                    if (source.quality.match(quality)) {
                        exact = source;
                    } else {
                        lowest = source;
                    }
                }
            }
            return exact || lowest;
        };

        var mp4 = video.getSource("video/mp4", "medium");
        console.log("MP4: " + mp4.url);

    }
})*/
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

app.configure('production', function(){
    app.use(express.errorHandler());
  });

// Mongoose connection
mongoose.connect(app.config.db);

// Configure passport
require('./config/passport')();

//setup the routes
require('./config/configure-routes')(passport);

// Start server
app.server.listen(app.get('port'), function(){
    console.log("Server is listening on port " + app.get('port'));
});