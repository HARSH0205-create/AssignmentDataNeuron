import React, { useState } from "react";
import axios from "axios";
import { FormWrapper, Input, SubmitButton } from "./Form.style";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { ENDPOINT } from "../endpoints";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile_number: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ENDPOINT+"/data/add", formData);
      console.log("Data added successfully!");
      // Reset form after successful submission
      setFormData({ name: "", age: "", mobile_number: "" });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Draggable>
      <Resizable>
        <FormWrapper onSubmit={handleFormSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="mobile_number"
            placeholder="Enter Mobile_number"
            value={formData.mobile_number}
            onChange={handleInputChange}
          />
          <SubmitButton type="submit">Add</SubmitButton>
        </FormWrapper>
      </Resizable>
    </Draggable>
  );
};

export default Form;
