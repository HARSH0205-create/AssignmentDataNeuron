const Data = require("../models/Data");

exports.addData = async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    return res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    return res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
