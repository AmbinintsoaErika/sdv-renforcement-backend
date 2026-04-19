const { Dossier, dbInstance } = require('../models');

const getAllDossiers = async (req, res) => {
    const dossiers = await Dossier.findAll();
    res.status(200).json({
        dossiers
    })
}

const getDossier = async (req, res) => {
    const id = req.params.id;
    const dossier = await Dossier.findOne({
        where: { id }
    })
    res.status(200).json({
        dossier
    })
}

const createDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { numeroDossier, sinistre_id, statut, estReparable, montantIndemnisation, dateIndemnisation, estApprouveClient } = req.body
        const existSinistre = await Sinistre.findOne({ id: sinistre_id })

        if(!existSinistre) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Sinistre not found'
            })
        }
        const dossier = await Dossier.create({
            numeroDossier,
            sinistre_id,
            statut,
            estReparable,
            montantIndemnisation,
            dateIndemnisation,
            estApprouveClient
        }, { transaction })
        return res.status(201).json({
            dossier
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on in creation',
            stacktrace: err.errors
        })
    }
}

const updateDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { numeroDossier, sinistre_id, statut, estReparable, montantIndemnisation, dateIndemnisation, estApprouveClient } = req.body
        const existSinistre = await Sinistre.findOne({ id: sinistre_id })

        if(!existSinistre) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Sinistre not found'
            })
        }
        
        const dossier_id = req.params.id

        const dossier = await Dossier.update({
            numeroDossier,
            sinistre_id,
            statut,
            estReparable,
            montantIndemnisation,
            dateIndemnisation,
            estApprouveClient
        }, {
            where: { id: dossier_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            dossier
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on dossier update',
            stacktrace: err.errors
        })
    }
}

const deleteDossier = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const dossier_id = req.params.id
        
        const status = await Dossier.destroy({
            where: { id: dossier_id },
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
            message: 'Error on dossier deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllDossiers,
    getDossier,
    createDossier,
    updateDossier,
    deleteDossier
}