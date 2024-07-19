import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo, ReactNode, useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import Select from "../ui/select";
type optionType = "system" | "dark" | "light";
const Icons: Record<optionType, ReactNode> = {
  system: <Monitor />,
  dark: <MoonStar />,
  light: <Sun />,
};

const ThemeSwitch = memo(({ _theme }: { _theme: string }) => {
  const { t } = useTranslation("header");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (_theme) {
      setTheme(_theme);
    }
  }, [_theme]);

  if (!mounted) {
    return null;
  }

  const changeTheme = (item: string) => {
    startTransition(() => {
      setTheme(item);
      setOpen(false);
    });
  };

  return (
    !_theme && (
      <Select
        open={open}
        setOpen={setOpen}
        content={
          <div className="cursor-pointer">{Icons[theme as optionType]}</div>
        }
      >
        <div className="w-auto backdrop-blur-md bg-opacity-50 flex flex-col gap-2">
          {["system", "dark", "light"]
            .filter((item) => item !== theme)
            .map((item) => (
              <div
                className="flex justify-between cursor-pointer items-center gap-2 "
                key={item}
                onClick={() => {
                  changeTheme(item);
                }}
              >
                {Icons[item as optionType]} <p className="text-sm">{t(item)}</p>
              </div>
            ))}
        </div>
      </Select>
    )
  );
});

export default ThemeSwitch;
