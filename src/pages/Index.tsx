
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { FilterBar } from "@/components/FilterBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AreaChart, BarChart, PieChart, LineChart } from "recharts";
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Settings, 
  Bell, 
  User,
  Search,
  FileText,
  Download,
  RefreshCcw 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  monthlySalesData, 
  regionalSalesData, 
  productSalesData, 
  newCustomersData, 
  topSalesReps 
} from "@/components/mock-data";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const COLORS = ['#0EA5E9', '#10B981', '#8B5CF6', '#F43F5E', '#FB923C', '#A3E635'];

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard updated",
        description: "Latest sales data has been loaded successfully",
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard refreshed",
        description: "Latest data has been loaded",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary dark:from-background dark:to-slate-900/20">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-dashboard-blue">Prism</h1>
            <span className="font-medium text-dashboard-purple">Sales Pulse</span>
          </div>
          
          <div className="relative w-full max-w-sm px-4 md:w-80 mx-4 hidden md:block">
            <Search className="absolute left-6 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-full pl-10 bg-background dark:bg-slate-900"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              onClick={handleRefresh}
            >
              <RefreshCcw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <ThemeToggle />
            
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <main className="container py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
            <p className="text-muted-foreground">Your sales data at a glance</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
              <FileText className="h-4 w-4" />
              Reports
            </Button>
            <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2 bg-dashboard-blue hover:bg-dashboard-blue/90">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8">
          <FilterBar />
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value="$1,235,000" 
            change={12.5} 
            colorClass="bg-dashboard-blue text-white"
            icon={<DollarSign className="h-5 w-5 text-white" />}
          />
          <StatCard 
            title="New Customers" 
            value="2,420" 
            change={5.7} 
            colorClass="bg-dashboard-green text-white"
            icon={<Users className="h-5 w-5 text-white" />}
          />
          <StatCard 
            title="Total Sales" 
            value="12,680" 
            change={-2.1} 
            colorClass="bg-dashboard-purple text-white"
            icon={<ShoppingBag className="h-5 w-5 text-white" />}
          />
          <StatCard 
            title="Conversion Rate" 
            value="5.6%" 
            change={0.8} 
            colorClass="bg-dashboard-gray text-white"
            icon={<TrendingUp className="h-5 w-5 text-white" />}
          />
        </div>
        
        {/* Charts - First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard 
            title="Monthly Sales" 
            description="Revenue vs Target"
            className="lg:col-span-2"
          >
            <div className="h-80 w-full">
              <AreaChart 
                width={800} 
                height={300}
                data={monthlySalesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                className="w-full overflow-hidden [&_.recharts-cartesian-grid-horizontal_line:last-child]:opacity-0"
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0EA5E9" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#F43F5E" 
                  name="Target"
                  strokeWidth={2}
                />
              </AreaChart>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Regional Sales" 
            description="By geographic region"
          >
            <div className="h-80 w-full flex items-center justify-center">
              <PieChart width={280} height={280}>
                <Pie
                  data={regionalSalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {regionalSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </div>
          </ChartCard>
        </div>
        
        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Product Performance" 
            description="Sales by product"
          >
            <div className="h-80 w-full">
              <BarChart
                width={500}
                height={300}
                data={productSalesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                className="w-full overflow-hidden"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  name="Sales ($)" 
                  radius={[4, 4, 0, 0]}
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </ChartCard>
          
          <ChartCard 
            title="Customer Growth" 
            description="New customers per month"
          >
            <div className="h-80 w-full">
              <LineChart
                width={500}
                height={300}
                data={newCustomersData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                className="w-full overflow-hidden"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }}
                  name="New Customers"
                />
              </LineChart>
            </div>
          </ChartCard>
        </div>
        
        {/* Top Sales Reps */}
        <ChartCard 
          title="Top Performing Sales Representatives" 
          description="This month's top performers"
        >
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Rep</th>
                  <th className="text-right py-3 px-4 font-medium">Sales</th>
                  <th className="text-right py-3 px-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topSalesReps.map((rep, index) => (
                  <tr key={rep.name} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={rep.avatar} alt={rep.name} />
                          <AvatarFallback>{rep.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{rep.name}</p>
                          <p className="text-sm text-muted-foreground">Sales Rep</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${rep.sales.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-full max-w-24 bg-secondary rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full"
                            style={{ 
                              width: `${(rep.sales / 250000) * 100}%`, 
                              backgroundColor: COLORS[index % COLORS.length] 
                            }} 
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((rep.sales / 250000) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </main>
      
      <footer className="border-t p-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Prism Sales Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Import these within the file to ensure they are available
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Line, Pie, Cell, Bar } from 'recharts';
