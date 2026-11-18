"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteFieldReport } from "@/lib/actions/field-reports";
import { cn } from "@/lib/utils";

export function ReportDelete({ reportId, dealerName }: { reportId: number; dealerName: string }) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "bg-card text-status-danger shadow-sm")}
      triggerAriaLabel={`Delete field report for ${dealerName}`}
      title="Delete field report?"
      description="This permanently removes the field visit report."
      confirmLabel="Delete report"
      successMessage="Field report deleted"
      action={() => deleteFieldReport(reportId)}
    />
  );
}
