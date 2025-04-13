
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  icon?: React.ReactNode;
  colorClass?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  change,
  icon,
  colorClass = "bg-dashboard-blue",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("dashboard-card glass-card hover-lift", className)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between pt-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <CardTitle className="text-3xl font-bold mt-2 tracking-tight">{value}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
            
            {typeof change !== 'undefined' && (
              <div className="flex items-center mt-3 text-sm">
                {change > 0 ? (
                  <div className="flex items-center text-emerald-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    <span>{Math.abs(change)}%</span>
                  </div>
                ) : change < 0 ? (
                  <div className="flex items-center text-rose-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    <span>{Math.abs(change)}%</span>
                  </div>
                ) : (
                  <span className="text-gray-500">0%</span>
                )}
                <span className="ml-1 text-muted-foreground">from last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn("p-3 rounded-full", colorClass)}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
