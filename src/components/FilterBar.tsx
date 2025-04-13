
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, FilterIcon, X } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const regions = ["All Regions", "North America", "Europe", "Asia", "South America", "Africa", "Oceania"];
const products = ["All Products", "Product A", "Product B", "Product C", "Product D"];

export function FilterBar() {
  const [region, setRegion] = useState("All Regions");
  const [product, setProduct] = useState("All Products");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    if (value !== "All Regions") {
      addFilter(value);
    }
  };

  const handleProductChange = (value: string) => {
    setProduct(value);
    if (value !== "All Products") {
      addFilter(value);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      const formattedDate = format(date, "MMM d, yyyy");
      addFilter(formattedDate);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select value={region} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={product} onValueChange={handleProductChange}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[180px] justify-start text-left font-normal bg-white dark:bg-slate-900", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "MMM d, yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
          <FilterIcon className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <div 
              key={filter} 
              className="flex items-center gap-1 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary-foreground rounded-full text-sm"
            >
              <span>{filter}</span>
              <button 
                onClick={() => removeFilter(filter)}
                className="rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 p-1"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </button>
            </div>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-muted-foreground px-2 h-7"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
