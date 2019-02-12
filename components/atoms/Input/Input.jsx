import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  color: ${props => props.color || '#000'};
  font-size: 1.4rem;
  padding: 5px;
  width: 100%;
`;

export default Input;
