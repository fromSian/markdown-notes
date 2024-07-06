import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoonStar, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
type optionType = "system" | "dark" | "light";
const Icons: Record<optionType, ReactNode> = {
  system: <Settings />,
  dark: <MoonStar />,
  light: <Sun />,
};

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        console.log(e);
        setOpen(e);
      }}
    >
      <PopoverTrigger>{Icons[theme as optionType]}</PopoverTrigger>
      <PopoverContent asChild>
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
          {["system", "dark", "light"]
            .filter((item) => item !== theme)
            .map((item) => (
              <div
                className="flex justify-center cursor-pointer"
                key={item}
                onClick={() => {
                  setTheme(item);
                  setTimeout(() => {
                    setOpen(false);
                  }, 100);
                }}
              >
                {Icons[item as optionType]}
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitch;
