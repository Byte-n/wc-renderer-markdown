import { css } from 'lit';

export default css`
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid var(--table-border-color, #e5e7eb);
    padding: 0.5rem 0.75rem;
  }
  thead th {
    background: var(--table-header-bg, #f9fafb);
  }
`;


