const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const docCtrl = require("../controllers/documentController");

router.use(auth);

router.post("/create", docCtrl.createDocument);
router.get("/sidebar", docCtrl.getSidebar);
router.get("/trash", docCtrl.getTrash);
router.get("/search", docCtrl.searchDocuments);
router.get("/:id", docCtrl.getDocumentById);

router.put("/update/:id", docCtrl.updateDocument);
router.put("/archive/:id", docCtrl.archiveDocument);
router.put("/restore/:id", docCtrl.restoreDocument);
router.put("/remove-field/:id", docCtrl.removeField);

router.delete("/delete/:id", docCtrl.deleteDocument);

module.exports = router;
