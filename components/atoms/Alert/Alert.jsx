import styled from 'styled-components';

const Alert = styled.div`
  background: ${props => props.type || '#EEE'};
  color: ${props => props.color || '#000'};
  padding: 10px;
`;

export default Alert;
