"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteOrder } from "@/lib/actions/orders";
import { cn } from "@/lib/utils";

export function OrderDelete({ orderId }: { orderId: number }) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-muted-foreground hover:bg-status-danger-soft hover:text-status-danger")}
      triggerAriaLabel={`Delete order #${orderId}`}
      title={`Delete order #${orderId}?`}
      description="This permanently removes the order along with its line items, payments, and delivery record."
      confirmLabel="Delete order"
      successMessage={`Order #${orderId} deleted`}
      action={() => deleteOrder(orderId)}
    />
  );
}
