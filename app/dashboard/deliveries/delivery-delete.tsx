"use client";

import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteDelivery } from "@/lib/actions/deliveries";
import { cn } from "@/lib/utils";

export function DeliveryDelete({ deliveryId }: { deliveryId: number }) {
  return (
    <ConfirmDialog
      trigger={<Trash2 aria-hidden className="size-3.5" />}
      triggerClassName={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "text-muted-foreground hover:bg-status-danger-soft hover:text-status-danger")}
      triggerAriaLabel={`Delete delivery #${deliveryId}`}
      title={`Delete delivery #${deliveryId}?`}
      description="This removes the delivery and its tracking history. The order itself is not affected."
      confirmLabel="Delete delivery"
      successMessage={`Delivery #${deliveryId} deleted`}
      action={() => deleteDelivery(deliveryId)}
    />
  );
}
