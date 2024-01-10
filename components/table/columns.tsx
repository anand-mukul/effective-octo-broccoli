"use client"

import React from 'react';
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { FileType } from "@/typings";
import { COLOR_EXTENSION_MAP } from "@/constants";
import DownloadLinkCell from "../DownloadLinkCell";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Format",
    cell: ({ renderValue }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="flex items-center justify-center w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
            className="w-6 h-6"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Name",
    cell: ({ renderValue }) => {
      const filename = renderValue() as string;
      return <span className="text-gray-800">{filename}</span>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ renderValue }) => {
      const dateAdded = renderValue() as string;
      return <span className="text-gray-800">{dateAdded}</span>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue }) => {
      const fileSize = renderValue() as number;
      return <span className="text-gray-400">{prettyBytes(fileSize)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: DownloadLinkCell,
  }
  
];
