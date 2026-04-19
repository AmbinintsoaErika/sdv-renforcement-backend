const { Document, dbInstance } = require('../models')

const getAllDocuments = async (req, res) => {
    const documents = await Document.findAll();
    res.status(200).json({
        documents
    })
}

const getDocument = async (req, res) => {
    const id = req.params.id;
    const document = await Document.findOne({
        where: { id }
    })
    res.status(200).json({
        document
    })
}

const createDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { titre, type, chemin } = req.body
        const document = await Document.create({
            titre,
            type,
            chemin
        }, { transaction })

        transaction.commit();
        return res.status(201).json({
            document
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on document creation',
            stacktrace: err.errors
        })
    }
}

const updateDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const { titre, type, chemin } = req.body
        const document_id = req.params.id

        const document = await Document.update({
            titre,
            type,
            chemin
        }, {
            where: { id: document_id },
            transaction
        })

        transaction.commit();
        return res.status(200).json({
            message: "Successfuly updated",
            document
        })
    } catch(err) {
        transaction.rollback();
        return res.status(400).json({
            message: 'Error on document update',
            stacktrace: err.errors
        })
    }
}

const deleteDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const document_id = req.params.id
        
        const status = await Document.destroy({
            where: { id: document_id },
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
            message: 'Error on document deletion',
            stacktrace: err.errors
        })
    }
}

module.exports = {
    getAllDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument
}