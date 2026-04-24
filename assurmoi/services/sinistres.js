const { Sinistre, Contrat, dbInstance } = require('../models');

const getAllSinistres = async (req, res) => {
    const sinistres = await Sinistre.findAll();
    res.status(200).json({
        sinistres
    })
}

const getSinistre = async (req, res) => {
    const id = req.params.id;
    const sinistre = await Sinistre.findOne({
        where: { id }
    })
    res.status(200).json({
        sinistre
    })
}

const createSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const {
            contrat_id,
            statut,
            dateAppel,
            dateSinistre,
            contexte,
            attestationAssurance,
            carteGrise,
            cin
        } = req.body;

        const existContrat = await Contrat.findOne({ where: { id: contrat_id } });
        if (!existContrat) {
            transaction.rollback();
            return res.status(400).json({
                message: 'Contrat not found'
            });
        }

        const documentIds = [attestationAssurance, carteGrise, cin];
        for (const docId of documentIds) {
            if (docId) {
                const existDocument = await Document.findOne({ where: { id: docId } });
                if (!existDocument) {
                    transaction.rollback();
                    return res.status(400).json({
                        message: `Document with ID ${docId} not found`
                    });
                }
            }
        }

        const sinistre = await Sinistre.create({
            contrat_id,
            statut,
            dateAppel,
            dateSinistre,
            contexte,
            attestationAssurance, 
            carteGrise,
            cin
        }, { transaction });

        transaction.commit();
        return res.status(201).json({
            sinistre
        });
    } catch (err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on sinistre creation',
            stacktrace: err.errors
        });
    }
};

const updateSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const {
            contrat_id,
            statut,
            dateAppel,
            dateSinistre,
            contexte,
            attestationAssurance,
            carteGrise,
            cin
        } = req.body;
        const sinistre_id = req.params.id;

        if (contrat_id) {
            const existContrat = await Contrat.findOne({ where: { id: contrat_id } });
            if (!existContrat) {
                transaction.rollback();
                return res.status(400).json({
                    message: 'Contrat not found'
                });
            }
        }

        const documentIds = [attestationAssurance, carteGrise, cin];
        for (const docId of documentIds) {
            if (docId) {
                const existDocument = await Document.findOne({ where: { id: docId } });
                if (!existDocument) {
                    transaction.rollback();
                    return res.status(400).json({
                        message: `Document with ID ${docId} not found`
                    });
                }
            }
        }

        const sinistre = await Sinistre.update({
            contrat_id,
            statut,
            dateAppel,
            dateSinistre,
            contexte,
            attestationAssurance,
            carteGrise,
            cin
        }, {
            where: { id: sinistre_id },
            transaction
        });

        transaction.commit();
        return res.status(200).json({
            message: "Successfully updated",
            sinistre
        });
    } catch (err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on sinistre update',
            stacktrace: err.errors
        });
    }
};

const deleteSinistre = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const sinistre_id = req.params.id
        
        const status = await Sinistre.destroy({
            where: { id: sinistre_id },
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
            message: 'Error on sinistre deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllSinistres,
    getSinistre,
    createSinistre,
    updateSinistre,
    deleteSinistre
}