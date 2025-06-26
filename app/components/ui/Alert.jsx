import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const variantStyles = {
  info: {
    icon: Info,
    color: "#3bb77e",
    border: "border-l-[#3bb77e]",
    text: "text-text",
    bg: "bg-[#f0fdf4]",
  },
  warning: {
    icon: AlertTriangle,
    color: "#f59e0b",
    border: "border-l-[#f59e0b]",
    text: "text-[#f59e0b]",
    bg: "bg-[#fffbeb]",
  },
  error: {
    icon: XCircle,
    color: "#ef4444",
    border: "border-l-[#ef4444]",
    text: "text-[#ef4444]",
    bg: "bg-[#fef2f2]",
  },
  success: {
    icon: CheckCircle2,
    color: "#22c55e",
    border: "border-l-[#22c55e]",
    text: "text-[#22c55e]",
    bg: "bg-[#f0fdf4]",
  },
};

export default function Alert({ className = "", children, variant = "info" }) {
  const styles = variantStyles[variant] || variantStyles.info;
  const Icon = styles.icon;

  return (
    <div
      className={`flex items-start font-light border p-5 border-l-4 gap-2 py-3 text-sm rounded-md max-[350px]:flex-col
        ${styles.border} ${styles.text} ${styles.bg} ${className}`}
    >
      <div>
        <Icon
          strokeWidth={2}
          color={styles.color}
          size={20}
          className="mt-0.5"
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
