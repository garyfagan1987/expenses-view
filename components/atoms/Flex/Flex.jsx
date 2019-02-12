import styled from 'styled-components';

const Flex = styled.div`
  align-items: ${props => (props.alignItems ? props.alignItems : 'align-items')};
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  flex-direction: row;
`;

export default Flex;
