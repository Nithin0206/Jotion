const Document = require("../models/document");

// Create document
exports.createDocument = async (req, res) => {
const { title, parentDocument } = req.body;
const document = await Document.create({
    title,
    parentDocument,
    userId: req.userId,
});
res.json(document);
};

// Get documents for sidebar
exports.getSidebar = async (req, res) => {
const parentDocument = req.query.parentDocument || null;
const documents = await Document.find({
    userId: req.userId,
    parentDocument,
    isArchived: false,
}).sort({ createdAt: -1 });res.json(documents);
}

// Archive document + children recursively
exports.archiveDocument = async (req, res) => {
const { id } = req.params;
const doc = await Document.findById(id);
if (!doc || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

await archiveRecursive(id, req.userId);
res.json({ success: true });
};

const archiveRecursive = async (docId, userId) => {
await Document.findByIdAndUpdate(docId, { isArchived: true });
const children = await Document.find({ parentDocument: docId, userId });
for (const child of children) {
    await archiveRecursive(child._id, userId);
}
};

// Restore document + children recursively
exports.restoreDocument = async (req, res) => {
const { id } = req.params;
const doc = await Document.findById(id);
if (!doc || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

  // Remove parent if parent is archived
if (doc.parentDocument) {
    const parent = await Document.findById(doc.parentDocument);
    if (parent?.isArchived) {
    doc.parentDocument = null;
    await doc.save();
    }
}

await restoreRecursive(id, req.userId);
res.json({ success: true });
};

const restoreRecursive = async (docId, userId) => {
await Document.findByIdAndUpdate(docId, { isArchived: false });
const children = await Document.find({ parentDocument: docId, userId });
for (const child of children) {
    await restoreRecursive(child._id, userId);
}
}

// Trash view
exports.getTrash = async (req, res) => {
const documents = await Document.find({
    userId: req.userId,
    isArchived: true,
}).sort({ createdAt: -1 });
res.json(documents);
};

// Delete document permanently
exports.deleteDocument = async (req, res) => {
const { id } = req.params;
const doc = await Document.findById(id);
if (!doc || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });
await Document.findByIdAndDelete(id);
res.json({ success: true });
};

// Get document by I
exports.getDocumentById = async (req, res) => {
const { id } = req.params;
const doc = await Document.findById(id);
if (!doc) return res.status(404).json({ error: "Not found" });
if (doc.isPublished && !doc.isArchived) return res.json(doc);
if (!req.userId || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });
res.json(doc);
};

// Search documents
exports.searchDocuments = async (req, res) => {
const documents = await Document.find({
    userId: req.userId,
    isArchived: false,
}).sort({ createdAt: -1 });
res.json(documents);
};

// Update document
exports.updateDocument = async (req, res) => {
const { id } = req.params;
const doc = await Document.findById(id);
if (!doc || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

const updates = req.body;
const updated = await Document.findByIdAndUpdate(id, updates, { new: true });
res.json(updated);
};

// Remove icon or coverImage
exports.removeField = async (req, res) => {
const { id } = req.params;
const { field } = req.query;
const doc = await Document.findById(id);
if (!doc || doc.userId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

if (!["icon", "coverImage"].includes(field)) return res.status(400).json({ error: "Invalid field" });

doc[field] = undefined;
await doc.save();
res.json(doc);
};
