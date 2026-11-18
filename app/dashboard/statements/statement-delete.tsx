"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteStatement } from "@/lib/actions/statements";
import { cn } from "@/lib/utils";

export function StatementDelete({
  statementId,
  statementNumber,
}: {
  statementId: number;
  statementNumber: string;
}) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-muted-foreground hover:bg-status-danger-soft hover:text-status-danger")}
      triggerAriaLabel={`Delete ${statementNumber}`}
      title={`Delete ${statementNumber}?`}
      description="This permanently removes the uploaded statement record."
      confirmLabel="Delete statement"
      successMessage={`${statementNumber} deleted`}
      action={() => deleteStatement(statementId)}
    />
  );
}
