import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const FormWrapper = styled.div`
  margin-top: 20px;
`;

export const FormField = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const UpdateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const UpdateButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #45a049;
  }
`;
