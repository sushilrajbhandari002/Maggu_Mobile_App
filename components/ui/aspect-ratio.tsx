"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

interface AspectRatioProps extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {}

function AspectRatio({ ...props }: AspectRatioProps) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
