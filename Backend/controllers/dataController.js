const Data = require("../models/Data");

exports.addData = async (req, res) => {
  try {
    const newData = await Data.create(req.body);
    res.status(201).json(newData);
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
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDataCount = async (req, res) => {
  try {
    const totalCount = await Data.countDocuments();
    res.json({ count: totalCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
