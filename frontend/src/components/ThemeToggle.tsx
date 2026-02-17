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
        className="min-w-[160px] border-4 border-black rounded-xl p-1 overflow-hidden font-comic font-bold shadow-[4px_4px_0px_black] z-[70]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3 px-4 rounded-lg flex items-center transition-colors"
        >
          <Sun className="mr-3 h-4 w-4" /> <span>Light Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3 px-4 rounded-lg flex items-center transition-colors"
        >
          <Moon className="mr-3 h-4 w-4" /> <span>Dark Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("inked")}
          className="cursor-pointer hover:bg-muted focus:bg-muted p-3 px-4 rounded-lg flex items-center transition-colors"
        >
          <PenTool className="mr-3 h-4 w-4" /> <span>Inked Mode</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
