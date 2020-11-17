/**
 * Private routes middleware
 * Create by wjdevelopersolutions on 20201117 01:04:00
 */

module.exports = (req, res, next) => {

    if (!req.session.isLoggedIn)
        return res.redirect('/login');
    
    next();
}