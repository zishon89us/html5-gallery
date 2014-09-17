/**
 * Created with JetBrains WebStorm.
 * User: Zeeshan Hassan
 */


exports = module.exports = function(app, passport) {

    app.get('/', require('./views/main').index);

    app.post('/user/:username', require('./views/user').addUser);

    app.get('/test', function(req, res){
        res.render('../../test/e2e/runner.html')
    })

};
