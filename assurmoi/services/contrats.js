const { Contrat, dbInstance } = require('../models')

const getAllContrats = async (req, res) => {
    const contrats = await Contrat.findAll();
    res.status(200).json({
        contrats
    })
}

const getContrat = async (req, res) => {
    const id = req.params.id;
    const contrat = await Contrat.findOne({
        where: { id }
    })
    res.status(200).json({
        contrat
    })
}

const createContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { numero_contrat, user_id, immatriculation_vehicule, rib } = req.body
        const contrat = await Contrat.create({
            numero_contrat,
            user_id,
            immatriculation_vehicule,
            rib
        }, { transaction })

        transaction.commit();
        return res.status(201).json({
            contrat
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on contrat creation',
            stacktrace: err.errors
        })
    }
}

const updateContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { numero_contrat, user_id, immatriculation_vehicule, rib } = req.body
        const contrat_id = req.params.id

        const contrat = await Contrat.update({
            numero_contrat,
            user_id,
            immatriculation_vehicule,
            rib
        }, {
            where: { id: contrat_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            contrat
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on contrat update',
            stacktrace: err.errors
        })
    }
}

const deleteContrat = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const contrat_id = req.params.id
        
        const status = await Contrat.destroy({
            where: { id: contrat_id },
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
            message: 'Error on contrat deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllContrats,
    getContrat,
    createContrat,
    updateContrat,
    deleteContrat
}