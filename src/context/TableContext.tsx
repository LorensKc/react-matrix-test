import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Cell = {
  id: number;
  amount: number;
};

type TableContextType = {
  matrix: Cell[][];
  updateCell: (row: number, col: number) => void;
  addRow: () => void;
  removeRow: (index: number) => void;
};

// ✅ Добавляем тип для пропсов провайдера
interface TableProviderProps {
  M: number;
  N: number;
  children: ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<TableProviderProps> = ({ M, N, children }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
function generateAmount () {
    return Number(Math.floor(Math.random() * 900) + 100)
}
  useEffect(() => {
    const generateMatrix = () => {
      let idCounter = 1;
      return Array.from({ length: M }, () =>
        Array.from({ length: N }, () => ({
          id: idCounter++,
          amount: generateAmount(),
        }))
      );
    };
    setMatrix(generateMatrix());
  }, [M, N]);

  const updateCell = (row: number, col: number) => {
    setMatrix((prev) =>
      prev.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? { ...cell, amount: cell.amount + 1 } : cell
        )
      )
    );
  };

  const addRow = () => {
    setMatrix((prev) => {
      let idCounter = prev.flat().length + 1;
      const newRow = Array.from({ length: N }, () => ({
        id: idCounter++,
        amount: Math.floor(Math.random() * 900) + 100,
      }));
      return [...prev, newRow];
    });
  };

  const removeRow = (index: number) => {
    setMatrix((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TableContext.Provider value={{ matrix, updateCell, addRow, removeRow }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error('useTable must be used within a TableProvider');
  return context;
};
