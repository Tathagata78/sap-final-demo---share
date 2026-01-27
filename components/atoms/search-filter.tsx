"use client";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  SearchIcon,
  AlertTriangleIcon,
  CheckIcon,
  Siren,
  RefreshCw,
  FilterIcon,
} from "lucide-react";

type FilterType = "" | "critical" | "protected" | "warning";

function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}: {
  search: string;
  setSearch: (v: string) => void;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  const resetAll = () => {
    setSearch("");
    setFilter("");
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <ButtonGroup className="w-full max-w-sm pt-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline" aria-label="Search">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </ButtonGroup>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={filter ? "px-4 font-medium" : "px-4"}
            >
              {filter ? (
                <span className="uppercase text-xs tracking-wide">
                  {filter}
                </span>
              ) : (
                <div className="flex gap-2 justify-between">
                  <FilterIcon className="h-4 w-4" />
                  <span className="text-xs uppercase">
                    Filter
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="[--radius:1rem]">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={resetAll} className="text-xs">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter("critical")}
                className="text-xs"
              >
                <Siren className="mr-2 h-4 w-4" />
                Critical
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter("protected")}
                className="text-xs"
              >
                <CheckIcon className="mr-2 h-4 w-4" />
                Protected
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter("warning")}
                className="text-xs"
              >
                <AlertTriangleIcon className="mr-2 h-4 w-4" />
                Warning
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SearchFilter;
