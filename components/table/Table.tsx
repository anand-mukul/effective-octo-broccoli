"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { FileType } from "@/typings";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useAppStore } from "@/store";
import { DeleteModal } from "../DeleteModal";
import RenameModal from "../RenameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [
    setIsDeleteModalOpen,
    setFileId,
    setFilename,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state.setIsDeleteModalOpen,
    state.setFileId,
    state.setFilename,
    state.setIsRenameModalOpen,
  ]);

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const openRenameModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFilename(filename);
    setIsRenameModalOpen(true);
  };

  const renderTimestampCell = (cell: any) => {
    const value = cell.getValue() as Date;
    return (
      <div className="flex flex-col">
        <div className="text-sm">{value.toLocaleDateString()}</div>
        <div className="text-xs text-gray-500">
          {value.toLocaleTimeString()}
        </div>
      </div>
    );
  };

  const renderFilenameCell = (row: any, cell: any) => {
    const filename = cell.getValue() as string;
    return (
      <p
        onClick={() => {
          openRenameModal(row.original.id, row.original.filename);
        }}
        className="underline flex items-center text-blue-500 hover:cursor-pointer"
      >
        {filename} <PencilIcon size={15} className="ml-2" />
      </p>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <RenameModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp"
                      ? renderTimestampCell(cell)
                      : cell.column.id === "filename"
                      ? renderFilenameCell(row, cell)
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"link"}
                    onClick={() => {
                      openDeleteModal((row.original as FileType).id);
                    }}
                  >
                    <Trash2Icon size={20} className="text-red-500"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have No Files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
