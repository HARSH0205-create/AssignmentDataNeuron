import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableWrapper, StyledTable, TableHead, TableCell, FormWrapper, FormField, FormLabel, FormInput, UpdateButtonWrapper, UpdateButton } from './Table.style';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { ENDPOINT } from "../endpoints";


const Table = ({ fetchData, fetchDataCount }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndCount = async () => {
      try {
        const dataResponse = await axios.get(ENDPOINT + '/data');
        setData(dataResponse.data);

        const countResponse = await axios.get(ENDPOINT + '/data/count');
        setCount(countResponse.data.count);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDataAndCount();
  }, [fetchData, fetchDataCount]);

  const handleRowClick = (rowData) => {
    setSelectedData(rowData);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(ENDPOINT + `/data/update/${selectedData._id}`, selectedData);
      console.log(response.data);

      fetchData();
      fetchDataCount();

      setSelectedData(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Draggable>
      <Resizable>
        <TableWrapper>
          <p>Total number of records in table: {count}</p>
          <StyledTable>
            <thead>
              <tr>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Mobile Number</TableHead>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.mobile_number}</TableCell>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          {selectedData && (
            <FormWrapper>
              <form>
                <FormField>
                  <FormLabel>Name:</FormLabel>
                  <FormInput type="text" value={selectedData.name} onChange={(e) => setSelectedData({ ...selectedData, name: e.target.value })} />
                </FormField>
                <FormField>
                  <FormLabel>Age:</FormLabel>
                  <FormInput type="number" value={selectedData.age} onChange={(e) => setSelectedData({ ...selectedData, age: e.target.value })} />
                </FormField>
                <FormField>
                  <FormLabel>Mobile Number:</FormLabel>
                  <FormInput type="number" value={selectedData.mobile_number} onChange={(e) => setSelectedData({ ...selectedData, mobile_number: e.target.value })} />
                </FormField>
              </form>
              <UpdateButtonWrapper>
                <UpdateButton onClick={handleUpdateClick}>Update</UpdateButton>
              </UpdateButtonWrapper>
            </FormWrapper>
          )}
        </TableWrapper>
      </Resizable>
    </Draggable>
  );
};

export default Table;
