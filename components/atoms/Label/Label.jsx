import styled from 'styled-components';

const Label = styled.label`
  color: ${props => props.color || '#000'};
  display: block;
  font-size: 1.4rem;
  margin-bottom: 5px;
`;

export default Label;
