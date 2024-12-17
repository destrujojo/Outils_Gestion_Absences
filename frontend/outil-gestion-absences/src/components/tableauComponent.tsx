import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";

// Définition du type pour les colonnes
interface Column<T> {
  id: keyof T; // Identifiant de la colonne (clé de l'objet)
  label: string; // Libellé de la colonne (affiché dans l'en-tête)
  minWidth?: number;
  align?: "right" | "left" | "center"; // Alignement de la colonne
  format?: (value: any) => string; // Optionnel : fonction de formatage pour les valeurs
}

// Définition du type pour les données (lignes)
interface Data {
  typesEvenements: string;
  statusGestions: string;
  commentaire: string;
  dateDebut: string;
  dateFin: Date;
  duree: number;
}

interface TableauComponentProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
}

export default function TableauComponent<T>({
  columns,
  rows,
  rowsPerPageOptions = [10, 25, 100],
}: TableauComponentProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id as string}
                        align={column.align || "left"}
                      >
                        {column.format
                          ? column.format(value) // Si un format est défini, l'appliquer
                          : String(value)}{" "}
                        {/* Sinon, afficher la valeur brute */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
