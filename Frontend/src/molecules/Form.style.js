import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 22px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
