import * as UIVariable from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
const Header = () => {
  const { headerDocked, headerExpanded, showNavigation, showChapters } =
    useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const moveRef = useRef<ReturnType<typeof setTimeout>>();

  const onMouseEnter = () => {
    if (moveRef.current) {
      clearTimeout(moveRef.current);
      moveRef.current = undefined;
    }
    moveRef.current = setTimeout(() => {
      dispatch({
        type: "ui/toggleHeaderExpanded",
      });
    }, 500);
  };

  const onMouseLeave = () => {
    if (headerDocked) {
      return;
    }
    if (moveRef.current) {
      clearTimeout(moveRef.current);
      moveRef.current = undefined;
    }
    moveRef.current = setTimeout(() => {
      dispatch({
        type: "ui/toggleHeaderExpanded",
      });
    }, 500);
  };
  return (
    <>
      {!headerExpanded && (
        <div
          className="fixed top-0 w-screen h-[2vh] opacity-0 bg-red-200 cursor-pointer z-10"
          onMouseEnter={onMouseEnter}
        ></div>
      )}
      <header
        className="flex gap-4 overflow-hidden transition-all"
        style={{ height: headerExpanded ? UIVariable.headerHeight : 0 }}
        onMouseLeave={onMouseLeave}
      >
        <Link className="text-3xl" to="/">
          logo
        </Link>
        {pathname === "/notes" && (
          <>
            <button
              onClick={() => {
                dispatch({
                  type: "ui/toggleShowNavigation",
                });
              }}
            >
              {showNavigation ? "hide" : "show"}
            </button>
            <button>add new note</button>
            <button>search</button>
          </>
        )}

        <Link to="/introduction">introduction</Link>
        <LanguageSwitch />
        <ThemeSwitch />

        {pathname === "/welcome" && (
          <>
            <button>sign up</button>
            <button>sign in</button>
            <button>sign in with google</button>
            <button>enter as vistor</button>
          </>
        )}

        <button
          onClick={() => {
            dispatch({
              type: "ui/toggleHeaderDocked",
            });
          }}
        >
          {headerDocked ? "undocked" : "docked"}
        </button>
        <div
          onClick={() => {
            dispatch({
              type: "ui/toggleShowChapters",
            });
          }}
        >
          {showChapters ? <SquareChevronRight /> : <SquareChevronLeft />}
        </div>
      </header>
    </>
  );
};

export default Header;
