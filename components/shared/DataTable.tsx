import type { LucideIcon } from "lucide-react";
import { isValidElement, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/EmptyState";
import { SortSelect } from "@/components/shared/SortSelect";

/**
 * Presentational, server-rendered data table. Filtering/sorting/pagination
 * happen server-side via services + URL params (see SortableHeader,
 * DataTablePagination). From `md` up it is a table; below that every row
 * becomes a stacked card: first column = title, `status` column = top-right
 * badge, `actions` column = footer, the rest as label/value pairs.
 */

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
  /** Plain-text label shown beside the value in the phone card layout. */
  label?: string;
  /** Omit this column from the phone card layout. */
  hideOnCard?: boolean;
}

/** Plain-text label for a column: explicit `label`, a string header, or a SortableHeader's text. */
function labelOf<T>(column: DataTableColumn<T>): string | null {
  if (column.label) return column.label;
  if (typeof column.header === "string") return column.header;
  if (isValidElement<{ children?: unknown }>(column.header)) {
    const text = column.header.props.children;
    if (typeof text === "string") return text;
  }
  return null;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty,
  className,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  empty: { icon: LucideIcon; title: string; hint: string; action?: ReactNode };
  className?: string;
}) {
  if (rows.length === 0) {
    return <EmptyState {...empty} />;
  }

  const titleColumn = columns[0];
  const statusColumn = columns.find((column) => column.key === "status");
  const actionsColumn = columns.find((column) => column.key === "actions");
  const detailColumns = columns.filter(
    (column) =>
      column !== titleColumn &&
      column !== statusColumn &&
      column !== actionsColumn &&
      !column.hideOnCard,
  );

  const sortOptions = columns.flatMap((column) => {
    if (!isValidElement<{ field?: unknown; children?: unknown }>(column.header)) return [];
    const { field, children } = column.header.props;
    return typeof field === "string" && typeof children === "string"
      ? [{ field, label: children }]
      : [];
  });

  return (
    <div className={className}>
      {sortOptions.length > 0 ? (
        <div className="mb-3 md:hidden">
          <SortSelect options={sortOptions} />
        </div>
      ) : null}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={rowKey(row)} className="rounded-2xl border bg-card p-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 text-sm">{titleColumn.cell(row)}</div>
              {statusColumn ? <div className="shrink-0">{statusColumn.cell(row)}</div> : null}
            </div>
            {detailColumns.length > 0 ? (
              <dl className="mt-3 space-y-2 border-t pt-3 text-sm">
                {detailColumns.map((column) => {
                  const label = labelOf(column);
                  return (
                    <div key={column.key} className="flex items-baseline justify-between gap-4">
                      {label ? <dt className="shrink-0 text-muted-foreground">{label}</dt> : null}
                      <dd className="min-w-0 text-right">{column.cell(row)}</dd>
                    </div>
                  );
                })}
              </dl>
            ) : null}
            {actionsColumn ? (
              <div className="mt-3 flex justify-end border-t pt-3">{actionsColumn.cell(row)}</div>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-2xl border bg-card shadow-xs md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={rowKey(row)}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
