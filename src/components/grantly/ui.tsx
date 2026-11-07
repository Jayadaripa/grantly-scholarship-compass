import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[11px] font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep",
        outline: "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/50",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        soft: "bg-accent text-accent-foreground hover:bg-accent/70",
        inverse: "bg-card text-primary-deep hover:bg-mint",
      },
      size: { sm: "h-9 px-3 text-sm", md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-[15px]", icon: "size-10" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, BtnProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[18px] border border-border bg-card shadow-soft", className)}>{children}</div>;
}

export function Pill({ tone = "neutral", children, className }: { tone?: "neutral" | "mint" | "warning" | "info" | "success" | "error" | "muted"; children: ReactNode; className?: string | undefined }) {
  const tones = {
    neutral: "bg-secondary text-foreground",
    mint: "bg-accent text-accent-foreground",
    warning: "bg-warning/12 text-warning",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    error: "bg-destructive/10 text-destructive",
    muted: "bg-secondary text-muted-foreground",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>{children}</span>;
}

export function DemoTag({ className }: { className?: string | undefined }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-dashed border-subtle/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", className)}>
      Demo data
    </span>
  );
}

export function EmptyState({ icon: Icon, title, text, action }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; action?: { label: string; to: string } }) {
  return (
    <Card className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-accent text-primary">
        <Icon className="size-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
      {action && (
        <Button asChild className="mt-5">
          <Link to={action.to}>{action.label}</Link>
        </Button>
      )}
    </Card>
  );
}

export const inputCls =
  "h-11 w-full rounded-[11px] border border-input bg-card px-3.5 text-sm text-foreground placeholder:text-subtle transition focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15";
