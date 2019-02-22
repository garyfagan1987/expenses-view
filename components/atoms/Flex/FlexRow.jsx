import styled from 'styled-components';

const FlexRow = styled.div`
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  flex-direction: row;
`;

export default FlexRow;
