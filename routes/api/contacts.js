const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {validateBody, isValidId} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact );

router.delete("/:contactId", isValidId, ctrl.removeContact );

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact );

router.patch("/:id/favorite", isValidId, validateBody(schemas.favoriteSchema), ctrl.updateStatusContact);


module.exports = router;
