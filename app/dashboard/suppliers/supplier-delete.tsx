"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteSupplier } from "@/lib/actions/inventory";
import { cn } from "@/lib/utils";

export function SupplierDelete({ supplierId, companyName }: { supplierId: number; companyName: string }) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-status-danger")}
      triggerAriaLabel={`Delete ${companyName}`}
      title={`Delete ${companyName}?`}
      description="Inventory records linked to this supplier will be unlinked, not deleted."
      confirmLabel="Delete supplier"
      successMessage={`${companyName} deleted`}
      action={() => deleteSupplier(supplierId)}
    />
  );
}
