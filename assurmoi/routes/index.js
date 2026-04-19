const { validateAuthentication } = require('../middlewares/auth');

const authRouter = require('./auth');
const userRouter = require('./users');
const contratRouter = require('./contrats');
const documentRouter = require('./documents');
const dossierRouter = require('./dossiers');
const expertiseRouter = require('./expertises');
const factureRouter = require('./factures');
const historiqueRouter = require('./historiques');
const interventionRouter = require('./interventions');
const sinistreRouter = require('./sinistres');

function initRoutes(app) {

    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/sinistres', sinistreRouter);
    app.use('/contrat', contratRouter);
    app.use('/dossiers', dossierRouter);
    app.use('/expertises', expertiseRouter);
    app.use('/interventions', interventionRouter);
    app.use('/documents', documentRouter);
    app.use('/factures', factureRouter);
    app.use('/historiques', historiqueRouter);

    app.get('/', (req, res) => {
        res.status(200).json({
            message: `Bienvenue sur la route d'accueil`
        });
    });
}

module.exports = initRoutes;