const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {validateBody} = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact );

router.delete("/:contactId", ctrl.removeContact );

router.put("/:id", validateBody(addSchema), ctrl.updateContact );


module.exports = router;
