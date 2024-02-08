import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "../molecules/Form";
import Table from "../organisms/Table";
import axios from "axios";
import { ENDPOINT } from "../endpoints";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  h1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: darkblue;
  }
`;

const Layout = () => {
  const [formData, setFormData] = useState({ name: "", age: "" });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(ENDPOINT + "/data");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ENDPOINT + "/data/add", formData);
      setTableData([...tableData, formData]);
      setFormData({ name: "", age: "" });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (index) => {
    const updatedData = prompt("Enter updated data in JSON format:");
    if (!updatedData) return;
    try {
      await axios.put(
        `${ENDPOINT}/data/update/${index}`,
        JSON.parse(updatedData)
      );
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Container>
      <h1>Fill User Form</h1>
      <Form
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        values={formData}
      />
      <Table data={tableData} onUpdate={handleUpdate} />
    </Container>
  );
};

export default Layout;
