exports.defaultMiddleware = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', '*');
    next();
}
