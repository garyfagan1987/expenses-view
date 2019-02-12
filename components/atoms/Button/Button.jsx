import styled from 'styled-components';

const Button = styled.button`
  background: ${({ secondary, theme: { button } }) => (secondary ? button.secondary : button.primary)};
  border-color: ${({ secondary, theme: { button } }) => (secondary ? button.primary : 'transparent')};
  border-radius: 5px;
  border-style: solid;
  border-width: 2px;
  color: ${({ secondary, theme: { button } }) => (secondary ? button.primary : button.secondary)};
  cursor: pointer;
  padding: 0.25em 1em;
  text-decoration: none;
  width: ${({ fullWidth }) => (fullWidth && '100%')};
  
  &:disabled {
    background: #EEE;
    border: 2px solid #CCC;
    color: #CCC;
    cursor: not-allowed;
  }
`;

export default Button;
