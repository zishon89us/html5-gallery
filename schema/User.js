/**
 * Created with JetBrains WebStorm.
 * User: Zeeshan Hassan
 */


exports = module.exports = function(app, mongoose) {
    var userSchema = new mongoose.Schema({
        username: { type: String, unique: true },
        password: String,
        email: String,
        isActive: Boolean
    });


    app.db.model('User', userSchema);
}