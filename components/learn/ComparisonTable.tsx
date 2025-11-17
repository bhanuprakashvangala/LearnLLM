import * as React from "react";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonColumn {
  title: string;
  highlight?: boolean;
}

interface ComparisonRow {
  feature: string;
  values: (string | boolean | "partial")[];
  description?: string;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  title?: string;
}

export function ComparisonTable({ columns, rows, title }: ComparisonTableProps) {
  const renderValue = (value: string | boolean | "partial") => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-success mx-auto" />
      ) : (
        <X className="w-5 h-5 text-error mx-auto" />
      );
    }
    if (value === "partial") {
      return <Minus className="w-5 h-5 text-warning mx-auto" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="my-8">
      {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-border rounded-lg overflow-hidden">
          {/* Header */}
          <thead>
            <tr className="bg-muted">
              <th className="p-4 text-left font-bold border-b-2 border-r-2 border-border">
                Feature
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-4 text-center font-bold border-b-2 border-border",
                    index < columns.length - 1 && "border-r-2",
                    col.highlight && "bg-primary/10"
                  )}
                >
                  {col.title}
                  {col.highlight && (
                    <div className="text-xs font-normal text-primary mt-1">
                      Recommended
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="p-4 font-medium border-b border-r-2 border-border">
                  <div>{row.feature}</div>
                  {row.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {row.description}
                    </div>
                  )}
                </td>
                {row.values.map((value, colIndex) => {
                  const isHighlighted = columns[colIndex].highlight;
                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        "p-4 text-center border-b border-border",
                        colIndex < row.values.length - 1 && "border-r-2",
                        isHighlighted && "bg-primary/5"
                      )}
                    >
                      {renderValue(value)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
