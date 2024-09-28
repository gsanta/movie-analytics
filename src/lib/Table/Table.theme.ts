import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['th', 'td', 'thead', 'tr', 'table', 'expandableTd']);

const Table = defineStyleConfig({
  // The styles all Cards have in common
  baseStyle: {
    th: {
      bgColor: 'yellow.500',
      _first: {
        borderTopLeftRadius: '0.5rem',
      },
      _last: {
        borderTopRightRadius: '0.5rem',
      },
      padding: '0.5rem',
      position: 'sticky',
      top: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase'
    },
    thead: {
      borderRadius: '0.5rem',
    },
    td: {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'gray.200',
      borderBottom: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100px',
      padding: '0.5rem',
      _first: {
        borderLeft: '1px',
        borderLeftColor: 'gray.200',
      },
      _last: {
        borderRight: '1px',
        borderRightColor: 'gray.200',
      },
    },
    expandableTd: {
      borderLeft: '1px',
      borderLeftColor: 'gray.200',
      borderRight: '1px',
      borderRightColor: 'gray.200',
      padding: '0.5rem',
    },
    table: {
      // border: '1px solid gray',
    },
    tr: {
      _last: {
        td: {
          borderBottomWidth: '3px',
          borderBottomColor: 'yellow.500',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'gray.200',
        },
      },
    },
    // display: 'flex',
    // flexDirection: 'column',
    // background: 'white',
    // alignItems: 'center',
    // gap: 6,
  },
});

export default Table;
