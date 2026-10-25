import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-all duration-300 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary:
        "bg-ink text-bg hover:opacity-90 hover:-translate-y-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.14)]",
      outline:
        "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bg",
      ghost: "text-ink hover:bg-ink/5",
      accent: "bg-accent text-white hover:opacity-90 hover:-translate-y-0.5",
    },
    size: {
      sm: "h-9 px-4 text-[13px]",
      md: "h-11 px-6 text-sm",
      lg: "h-[52px] px-8 text-[15px]",
      icon: "size-10",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
