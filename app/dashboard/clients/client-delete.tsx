"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteCustomer } from "@/lib/actions/customers";
import { cn } from "@/lib/utils";

export function ClientDelete({ customerId, clientName }: { customerId: number; clientName: string }) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-muted-foreground hover:bg-status-danger-soft hover:text-status-danger")}
      triggerAriaLabel={`Delete ${clientName}`}
      title={`Delete ${clientName}?`}
      description="This removes the client along with their notes and statements. Clients with existing orders or quotations cannot be deleted."
      confirmLabel="Delete client"
      successMessage={`${clientName} deleted`}
      action={() => deleteCustomer(customerId)}
    />
  );
}
