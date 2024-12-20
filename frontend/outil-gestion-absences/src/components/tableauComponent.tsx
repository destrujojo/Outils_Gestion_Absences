import Download from "@mui/icons-material/Download";
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
import useTelechargementFichiers from "../hooks/useTelechargementFichiers";
import useStatusNotifications from "../hooks/useUpdateStatusNotifications";

// Définition du type pour les colonnes
interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface RowData {
  idNotifications?: string;
  statusNotifications?: string;
}

interface TableauComponentProps<T extends RowData> {
  columns: Column<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  onStatusChange?: (
    idNotifications: string,
    statusNotifications: string
  ) => void; // Ajout des paramètres dans le onStatusChange
}

export default function TableauComponent<T extends RowData>({
  columns,
  rows,
  rowsPerPageOptions = [10, 25, 100],
  onStatusChange,
}: TableauComponentProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { telechargementFichiers } = useTelechargementFichiers();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownload = (fichiers: string) => {
    console.log("Téléchargement de :", fichiers);
    telechargementFichiers(fichiers);
  };

  const handleStatusNotifications = (
    status: string,
    idNotifications: string
  ) => {
    if (onStatusChange) {
      onStatusChange(idNotifications, status); // Passez idNotifications et statusNotifications
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns
                .filter((column) => column.id !== "idStatusNotifications")
                .map((column) => (
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
                  {columns
                    .filter((column) => column.id !== "idStatusNotifications")
                    .map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id as string}
                          align={column.align || "left"}
                        >
                          {value ? (
                            column.id === "idFichiers" ? (
                              <button
                                onClick={() => handleDownload(value as string)}
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                <Download fontSize="small" />
                              </button>
                            ) : column.id === "statusNotifications" ? (
                              <button
                                onClick={() =>
                                  handleStatusNotifications(
                                    value as string,
                                    row.idNotifications || ""
                                  )
                                }
                                className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                {String(value)}
                              </button>
                            ) : column.format ? (
                              column.format(value)
                            ) : (
                              String(value)
                            )
                          ) : (
                            <></>
                          )}
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
