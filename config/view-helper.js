const env = require('./environment');
const fs = require('fs');


module.export = (app) => {
    app.locals.assetPath = function (filePath) {
        if (env.name == 'development') {
            return filePath;
        }
        return JSON.parse(fs.readFileSync(path.j))
    }
}