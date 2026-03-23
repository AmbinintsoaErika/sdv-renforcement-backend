const userRouter = require('./users');

function initRoutes(app) {
    app.use('/user/', userRouter);
    
    app.use('/', (req, res, next) => {
        // middleware
        console.log('middleware 1 homepage')
        next();
    }, (req, res, next) => {
        // controller
        console.log('controller');
        res.status(200).json({
            message: `Bienvenue sur la route d'accueil`
        });  
    });
}

module.exports = initRoutes;