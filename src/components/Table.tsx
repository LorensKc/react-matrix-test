import React, { useState } from "react";
import { useTable } from "../context/TableContext";
import { TableRow } from "./TableRow";
const Table: React.FC = () => {
  const { matrix, addRow } = useTable();
  const [hoveredCellValue, setHoveredCellValue] = useState<number | null>(null);
  return (
    <div>
      <table border={1} style={{ marginBottom: 10 }}>
        <thead>
          <tr>
            <td colSpan={matrix[0]?.length}>Cols</td>
            <td>Summary</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              rowIndex={rowIndex}
              hoveredCellValue={hoveredCellValue}
              onCellHovered={(value) => setHoveredCellValue(value)}
            /> 
          ))}
          <tr>
            {/* For each column shoul be 50% of summ */}
            {matrix[0]?.map((_, colIndex) => (
              <td key={colIndex}>
                {matrix.reduce((acc, row) => acc + row[colIndex].amount, 0) / 2}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default Table;
