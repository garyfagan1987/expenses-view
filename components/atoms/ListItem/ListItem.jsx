import styled from 'styled-components';

const ListItem = styled.li`
  border-top: 1px solid #CCC;
  list-style: none;
  padding: 0.5rem;

  &:hover {
    background-color: #F3F3F3;
  }

  &:last-child {
    border-bottom: 1px solid #CCC;
  }
`;

export default ListItem;
