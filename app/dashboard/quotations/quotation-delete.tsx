"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteQuotation } from "@/lib/actions/quotations";
import { cn } from "@/lib/utils";

export function QuotationDelete({
  quotationId,
  quotationNumber,
}: {
  quotationId: number;
  quotationNumber: string;
}) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-muted-foreground hover:bg-status-danger-soft hover:text-status-danger")}
      triggerAriaLabel={`Delete ${quotationNumber}`}
      title={`Delete ${quotationNumber}?`}
      description="This permanently removes the quotation and its line items."
      confirmLabel="Delete quotation"
      successMessage={`${quotationNumber} deleted`}
      action={() => deleteQuotation(quotationId)}
    />
  );
}
