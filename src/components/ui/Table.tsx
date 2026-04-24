"use client";

import React from "react";

export type TableColumn<T extends Record<string, unknown>> = {
    key: keyof T;
    header: string;
    width?: string;
    minWidth?: string;
    align?: "left" | "center" | "right";
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

interface TableProps<T extends Record<string, unknown>> {
    columns: TableColumn<T>[];
    data: T[];
    responsive?: boolean;
    minWidth?: string;
    className?: string;
    tableClassName?: string;
}

const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
} as const;

export default function Table<T extends Record<string, unknown>>({
    columns,
    data,
    responsive = false,
    minWidth = "600px",
    className = "",
    tableClassName = "",
}: TableProps<T>) {
    return (
        <div
            className={`w-full ${responsive ? "overflow-x-auto table-scroll" : ""} ${className}`}
        >
            <table
                className={`border-collapse text-sm lg:text-base ${responsive ? "w-full" : "w-full"} ${tableClassName}`}
                style={responsive ? { minWidth } : undefined}
            >
                <thead>
                    <tr className="border-b border-current/20">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                style={{
                                    ...(col.width ? { width: col.width } : {}),
                                    ...(col.minWidth ? { minWidth: col.minWidth } : {}),
                                }}
                                className={`px-3 py-2.5 lg:px-4 lg:py-3 font-semibold text-app-fg/70 ${alignClass[col.align ?? "left"]}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-current/10 last:border-b-0 hover:bg-current/5 transition-colors duration-150"
                        >
                            {columns.map((col) => (
                                <td
                                    key={String(col.key)}
                                    style={col.minWidth ? { minWidth: col.minWidth } : undefined}
                                    className={`px-3 py-3 lg:px-4 lg:py-4 align-top ${alignClass[col.align ?? "left"]}`}
                                >
                                    {col.render
                                        ? col.render(row[col.key], row)
                                        : (row[col.key] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
