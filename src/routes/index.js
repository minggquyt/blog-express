const newsRoute = require('../routes/news');
const sitesRoute = require('../routes/sites');

function route(app) {
    app.use('/news', newsRoute);
    app.use('/', sitesRoute);
}

module.exports = route;
