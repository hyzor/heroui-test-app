import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SectionBodyProps = HTMLAttributes<HTMLDivElement>;

export function SectionBody({
  className,
  children,
  ...props
}: SectionBodyProps) {
  return (
    <div className={cn("mt-8 flex justify-center", className)} {...props}>
      {children}
    </div>
  );
}
