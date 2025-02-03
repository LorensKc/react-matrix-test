import { useState } from "react";
import { useTable } from "../context/TableContext";

export const TableRow = (props: { rowIndex: number; hoveredCellValue?: number | null; onCellHovered: (value: number | null) => void }) => {
  const { rowIndex } = props;
  const { matrix, updateCell, removeRow } = useTable();
  const row = matrix[rowIndex];
  function getBackgroundColor(rowIndex: number, colIndex: number) {
    let percentage = getPercentage(rowIndex, colIndex);
    let colorIntensity = Math.round(255 - percentage * 2.55);
    return `rgb(${colorIntensity}, ${255}, ${colorIntensity})`;
  }
  function getPercentage(rowIndex: number, colIndex: number) {
    const sum = matrix[rowIndex]?.reduce((acc, cell) => acc + cell.amount, 0);
    const cellValue = matrix[rowIndex]?.[colIndex].amount;
    return Math.round((cellValue / sum) * 100);
  }
  const [isHovered, setIsHovered] = useState(false);

  function isCloseToHovered(cellValue: number) {
    // Check if cellValue is closest to hoveredCellValue
    if (!props.hoveredCellValue) return false;
    return getClosestCell(1) === cellValue || getClosestCell(-1) === cellValue;
  }
  function getSortedUniqueArray() {
    return Array.from(
      new Set(
        matrix
          .flat()
          .sort((a, b) => a.amount - b.amount)
          .map((c) => c.amount)
      )
    );
  }
  function getClosestCell(offset: number) {
    if (!props.hoveredCellValue) return null;
    const allUniqueCells = getSortedUniqueArray();
    const hoveredIndex = allUniqueCells.findIndex(
      (c) => c === props.hoveredCellValue
    );
    return allUniqueCells[hoveredIndex + offset];
  }
  return (
    <tr key={rowIndex}>
      {row.map((cell, colIndex) => (
        <td
          key={cell.id}
          onClick={() => updateCell(rowIndex, colIndex)}
          onMouseOver={() => props.onCellHovered(cell.amount)}
          onMouseOut={() => props.onCellHovered(null)}
          style={{
            cursor: "pointer",
            minWidth: "50px",
            backgroundColor: isHovered
              ? getBackgroundColor(rowIndex, colIndex)
              : "inherit",
            color: isCloseToHovered(cell.amount) ? "orange" : "inherit",
          }}
        >
          {isHovered
            ? getPercentage(rowIndex, colIndex) + "%"
            : Number(cell.amount)}
        </td>
      ))}
      <td
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {row.reduce((acc, cell) => acc + cell.amount, 0)}
      </td>
      <td>
        <button onClick={() => removeRow(rowIndex)}>Delete Row</button>
      </td>
    </tr>
  );
};
