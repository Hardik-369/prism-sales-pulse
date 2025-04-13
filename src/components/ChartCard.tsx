
import { CardTitle, CardContent, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  downloadable?: boolean;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  downloadable = true,
}: ChartCardProps) {
  return (
    <Card className={cn("dashboard-card glass-card", className)}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {downloadable && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
}
