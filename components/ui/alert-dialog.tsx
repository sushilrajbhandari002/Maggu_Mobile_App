import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "./utils";
import { buttonVariants } from "./button";

export function AlertDialogDemo() {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger className={buttonVariants()}>
        Open Alert
      </AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 max-w-sm w-full p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <AlertDialogPrimitive.Title className="text-lg font-bold">
            Delete Item
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialogPrimitive.Description>

          <div className="mt-4 flex justify-end gap-2">
            <AlertDialogPrimitive.Cancel className={buttonVariants({ variant: "outline" })}>
              Cancel
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action className={buttonVariants()}>
              Confirm
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
