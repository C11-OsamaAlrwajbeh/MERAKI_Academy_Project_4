const roleSchema = require("../models/roleSchema")
const create = (req, res) => {
    const { role, permissions } = req.body;
    const newRole = new roleSchema({ role, permissions });
    newRole
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Role created`,
          role: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  
  module.exports = { create };
  