const { Document, dbInstance } = require('../models');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.status(200).json({ documents });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching documents', stacktrace: err.message });
    }
};

const getDocument = async (req, res) => {
    try {
        const id = req.params.id;
        const document = await Document.findOne({ where: { id } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ document });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching document', stacktrace: err.message });
    }
};

const createDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(__dirname, '../uploads/documents');

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ message: 'Error parsing form data', stacktrace: err.message });
        }

        try {
            const { titre, type } = fields;
            const file = files.file;

            if (!file) {
                return res.status(400).json({ message: 'File is required' });
            }

            const filePath = path.join('uploads/documents', path.basename(file.filepath));

            const document = await Document.create(
                {
                    titre: titre || file.originalFilename,
                    type,
                    chemin: filePath,
                },
                { transaction }
            );

            await transaction.commit();
            res.status(201).json({ document });
        } catch (err) {
            await transaction.rollback();
            res.status(400).json({ message: 'Error creating document', stacktrace: err.message });
        }
    });
};

const updateDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(__dirname, '../uploads/documents');

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ message: 'Error parsing form data', stacktrace: err.message });
        }

        try {
            const { titre, type } = fields;
            const document_id = req.params.id;

            const document = await Document.findOne({ where: { id: document_id } });
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            let filePath = document.chemin;
            if (files.file) {
                if (fs.existsSync(document.chemin)) {
                    fs.unlinkSync(document.chemin);
                }
                filePath = path.join('uploads/documents', path.basename(files.file.filepath));
            }

            await Document.update(
                {
                    titre: titre || document.titre,
                    type,
                    chemin: filePath,
                },
                { where: { id: document_id }, transaction }
            );

            await transaction.commit();
            res.status(200).json({ message: 'Document updated successfully' });
        } catch (err) {
            await transaction.rollback();
            res.status(400).json({ message: 'Error updating document', stacktrace: err.message });
        }
    });
};

const deleteDocument = async (req, res) => {
    const transaction = await dbInstance.transaction();
    try {
        const document_id = req.params.id;

        const document = await Document.findOne({ where: { id: document_id } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        if (fs.existsSync(document.chemin)) {
            fs.unlinkSync(document.chemin);
        }

        await Document.destroy({ where: { id: document_id }, transaction });
        await transaction.commit();

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
        await transaction.rollback();
        res.status(400).json({ message: 'Error deleting document', stacktrace: err.message });
    }
};

module.exports = {
    getAllDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
};