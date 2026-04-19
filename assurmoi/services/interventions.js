const { Intervention, Dossier, dbInstance } = require('../models');

const getAllInterventions = async (req, res) => {
    const interventions = await Intervention.findAll();
    res.status(200).json({
        interventions
    })
}

const getIntervention = async (req, res) => {
    const id = req.params.id;
    const intervention = await Intervention.findOne({
        where: { id }
    })
    res.status(200).json({
        intervention
    })
}

const createIntervention = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, dateInterventionPlanifiee, datePECPlanifiee, datePEC, dateDebutTravaux, dateFinTravaux, dateRestitutionPlanifiee, dateRestitutionEffective } = req.body
        const existDossier = await Dossier.findOne({ id: dossier_id })

        if(!existDossier) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Dossier not found'
            })
        }

        const intervention = await Intervention.create({
            dossier_id,
            dateInterventionPlanifiee,
            datePECPlanifiee,
            datePEC,
            dateDebutTravaux,
            dateFinTravaux,
            dateRestitutionPlanifiee,
            dateRestitutionEffective
        }, { transaction })
        return res.status(201).json({
            intervention
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on intervention creation',
            stacktrace: err.errors
        })
    }
}

const updateIntervention = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { dossier_id, dateInterventionPlanifiee, datePECPlanifiee, datePEC, dateDebutTravaux, dateFinTravaux, dateRestitutionPlanifiee, dateRestitutionEffective } = req.body
        const intervention_id = req.params.id

        const intervention = await Intervention.update({
            dossier_id,
            dateInterventionPlanifiee,
            datePECPlanifiee,
            datePEC,
            dateDebutTravaux,
            dateFinTravaux,
            dateRestitutionPlanifiee,
            dateRestitutionEffective
        }, {
            where: { id: intervention_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            intervention
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on intervention update',
            stacktrace: err.errors
        })
    }
}

const deleteIntervention = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const intervention_id = req.params.id
        
        const status = await Intervention.destroy({
            where: { id: intervention_id },
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
            message: 'Error on intervention deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllInterventions,
    getIntervention,
    createIntervention,
    updateIntervention,
    deleteIntervention
}