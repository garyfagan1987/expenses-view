import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Text = styled.span(({
  bold, color, marginBottom,
}) => ({
  color,
  fontWeight: bold ? 600 : 100,
  marginBottom: marginBottom ? '20px' : 0,
  marginTop: 0,
}));

Text.propType = {
  color: PropTypes.string,
};

Text.defaultProps = {
  color: '#333',
};

export default Text;
