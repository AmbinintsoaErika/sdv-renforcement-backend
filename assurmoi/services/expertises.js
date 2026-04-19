const { Expertise, Dossier, dbInstance } = require('../models');

const getAllExpertises = async (req, res) => {
    const expertises = await Expertise.findAll();
    res.status(200).json({
        expertises
    })
}

const getExpertise = async (req, res) => {
    const id = req.params.id;
    const expertise = await Expertise.findOne({
        where: { id }
    })
    res.status(200).json({
        expertise
    })
}

const createExpertise = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, datePlanifiee, dateEffective, dateRetour, rapportExpert } = req.body
        const existDossier = await Dossier.findOne({ id: dossier_id })

        if(!existDossier) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Dossier not found'
            })
        }

        const expertise = await Expertise.create({
            dossier_id,
            datePlanifiee,
            dateEffective,
            dateRetour,
            rapportExpert
        }, { transaction })
        return res.status(201).json({
            expertise
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on expertise creation',
            stacktrace: err.errors
        })
    }
}

const updateExpertise = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, datePlanifiee, dateEffective, dateRetour, rapportExpert } = req.body
        const expertise_id = req.params.id

        const expertise = await Expertise.update({
            dossier_id,
            datePlanifiee,
            dateEffective,
            dateRetour,
            rapportExpert
        }, {
            where: { id: expertise_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            expertise
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on expertise update',
            stacktrace: err.errors
        })
    }
}

const deleteExpertise = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const expertise_id = req.params.id
        
        const status = await Expertise.destroy({
            where: { id: expertise_id },
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
            message: 'Error on expertise deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllExpertises,
    getExpertise,
    createExpertise,
    updateExpertise,
    deleteExpertise
}