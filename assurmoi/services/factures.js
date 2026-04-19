const { Facture, Dossier, dbInstance } = require('../models');

const getAllFactures = async (req, res) => {
    const factures = await Facture.findAll();
    res.status(200).json({
        factures
    })
}

const getFacture = async (req, res) => {
    const id = req.params.id;
    const facture = await Facture.findOne({
        where: { id }
    })
    res.status(200).json({
        facture
    })
}

const createFacture = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, montant, dateReceptionFacture, dateReglementFacture, estRegleParTiers, estPaye, document } = req.body
        const existDossier = await Dossier.findOne({ id: dossier_id })

        if(!existDossier) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Dossier not found'
            })
        }

        const facture = await Facture.create({
            dossier_id,
            montant,
            dateReceptionFacture,
            dateReglementFacture,
            estRegleParTiers,
            estPaye,
            document
        }, { transaction })
        return res.status(201).json({
            facture
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on facture creation',
            stacktrace: err.errors
        })
    }
}

const updateFacture = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, montant, dateReceptionFacture, dateReglementFacture, estRegleParTiers, estPaye, document } = req.body
        const facture_id = req.params.id

        const facture = await Facture.update({
            dossier_id,
            montant,
            dateReceptionFacture,
            dateReglementFacture,
            estRegleParTiers,
            estPaye,
            document
        }, {
            where: { id: facture_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            facture
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on facture update',
            stacktrace: err.errors
        })
    }
}

const deleteFacture = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const facture_id = req.params.id
        
        const status = await Facture.destroy({
            where: { id: facture_id },
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
            message: 'Error on facture deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllFactures,
    getFacture,
    createFacture,
    updateFacture,
    deleteFacture
}