import React from "react";

export const Table = ({ children }: any) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    {children}
  </table>
);

export const TableHeader = ({ children }: any) => (
  <thead>{children}</thead>
);

export const TableBody = ({ children }: any) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: any) => (
  <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
    {children}
  </tr>
);

export const TableHead = ({ children }: any) => (
  <th
    style={{
      textAlign: "left",
      padding: "10px",
      fontWeight: 600,
    }}
  >
    {children}
  </th>
);

export const TableCell = ({ children }: any) => (
  <td style={{ padding: "10px" }}>{children}</td>
);