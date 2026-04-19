const { Historique, Sinistre, Dossier, dbInstance } = require('../models');

const getAllHistoriques = async (req, res) => {
    const historiques = await Historique.findAll();
    res.status(200).json({
        historiques
    })
}

const getHistorique = async (req, res) => {
    const id = req.params.id;
    const historique = await Historique.findOne({
        where: { id }
    })
    res.status(200).json({
        historique
    })
}

const createHistorique = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { sinistre_id, dossier_id, detail, user_id, dateModification } = req.body
        const existDossier = await Dossier.findOne({ id: dossier_id })
        const existSinistre = await Sinistre.findOne({ id: sinistre_id })

        if(!existDossier && !existSinistre) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Dossier or Sinistre not found'
            })
        }

        const historique = await Historique.create({
            sinistre_id,
            dossier_id,
            detail,
            user_id,
            dateModification
        }, { transaction })
        return res.status(201).json({
            historique
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on historique creation',
            stacktrace: err.errors
        })
    }
}

const updateHistorique = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { sinistre_id, dossier_id, detail, user_id, dateModification } = req.body
        const existDossier = await Dossier.findOne({ id: dossier_id })
        const existSinistre = await Sinistre.findOne({ id: sinistre_id })

        if(!existDossier && !existSinistre) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Dossier or Sinistre not found'
            })
        }

        const historique_id = req.params.id

        const historique = await Historique.update({
            sinistre_id,
            dossier_id,
            detail,
            user_id,
            dateModification
        }, {
            where: { id: historique_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            historique
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on historique update',
            stacktrace: err.errors
        })
    }
}

const deleteHistorique = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const historique_id = req.params.id
        
        const status = await Historique.destroy({
            where: { id: historique_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly deleted",
            status
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on historique deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllHistoriques,
    getHistorique,
    createHistorique,
    updateHistorique,
    deleteHistorique
}