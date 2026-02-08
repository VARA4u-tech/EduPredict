import { Moon, Sun, PenTool } from "lucide-react";
import { useMockData } from "@/context/MockDataContext";
import ComicButton from "./ComicButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeToggle = () => {
  const { theme, setTheme } = useMockData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative inline-flex">
          <ComicButton
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "inked" && <PenTool className="h-5 w-5" />}
          </ComicButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-4 border-black rounded-xl p-0 overflow-hidden font-comic font-bold"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3"
        >
          <Sun className="mr-2 h-4 w-4" /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3"
        >
          <Moon className="mr-2 h-4 w-4" /> Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("inked")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3"
        >
          <PenTool className="mr-2 h-4 w-4" /> Inked Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
