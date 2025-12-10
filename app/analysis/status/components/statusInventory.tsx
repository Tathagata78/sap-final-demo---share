import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

// Dummy Data
const INVENTORY_DATA = [
  {
    id: "INV-001",
    name: "Dell PowerEdge R740",
    status: "Ready",
    location: "Server Room A",
  },
  {
    id: "INV-002",
    name: "Cisco Switch 2960",
    status: "Ready",
    location: "Network Closet",
  },
  {
    id: "INV-003",
    name: "MacBook Pro M2",
    status: "Ready",
    location: "IT Storage",
  },
  {
    id: "INV-004",
    name: "HP EliteBook 840",
    status: "Not Ready",
    location: "Maintenance",
  },
  {
    id: "INV-005",
    name: 'Dell Monitor 27"',
    status: "Ready",
    location: "Stockpile",
  },
  {
    id: "INV-006",
    name: "Logitech MX Master",
    status: "Ready",
    location: "Stockpile",
  },
  {
    id: "INV-007",
    name: "Keychron K2",
    status: "Not Ready",
    location: "Pending Return",
  },
  {
    id: "INV-008",
    name: "iPad Pro 12.9",
    status: "Ready",
    location: "Executive Spare",
  },
];

export const StatusInventory = () => {
  const total = INVENTORY_DATA.length;
  const ready = INVENTORY_DATA.filter((i) => i.status === "Ready").length;
  const notReady = total - ready;
  const percentage = Math.round((ready / total) * 100);

  return (
    <Card className="h-full flex flex-col">
      {/* --- Card Header --- */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Inventory
          </CardTitle>
          <Badge
            variant="outline"
            className="text-xs font-normal text-muted-foreground"
          >
            Assets
          </Badge>
        </div>
        <CardDescription>Asset availability status</CardDescription>
      </CardHeader>

      {/* --- Main Content (Big Numbers) --- */}
      <CardContent className="flex flex-col justify-center">
        <div className="flex items-baseline space-x-2">
          <span className="text-6xl font-extrabold text-green-600 dark:text-green-500">
            {ready}
          </span>
          <span className="text-2xl text-muted-foreground font-medium">
            / {total} Ready
          </span>
        </div>

        {/* Simple visual bar */}
        <div className="w-full h-2 bg-secondary rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          <span className="text-red-500 font-medium text-lg">{notReady}</span>{" "}
          assets require attention.
        </p>
      </CardContent>

      {/* --- Footer --- */}
      <CardFooter className="border-t bg-muted/20 flex justify-between items-center gap-2">
        <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <RefreshCcw className="h-3 w-3" />
            Updated: 10m ago
          </span>
        </div>

        {/* View Details Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size={"icon-sm"} className="w-fit cursor-pointer py-2 px-4 text-xs">
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Inventory Details</DialogTitle>
              <DialogDescription>
                Current breakdown of ready vs. pending assets.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[350px] w-full pr-6">
              <div className="space-y-2">
                {INVENTORY_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.id} • {item.location}
                      </span>
                    </div>
                    {item.status === "Ready" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Ready
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20"
                      >
                        <AlertCircle className="h-3 w-3 mr-1" /> Not Ready
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default StatusInventory;
