import * as UIVariable from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/states/hooks";

import {
  ChevronDown,
  Info,
  NotebookPen,
  PanelLeftClose,
  PanelRightOpen,
  Search,
} from "lucide-react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../svgs/logo";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
const Header = () => {
  const { headerDocked, headerExpanded, showNavigation, showChapters } =
    useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const moveRef = useRef<ReturnType<typeof setTimeout>>();

  const drawHeaderDown = () => {
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
          className="fixed top-0 right-[50%] translate-x-[50%] cursor-pointer z-[2] hover:bg-secondary rounded"
          onClick={drawHeaderDown}
        >
          <ChevronDown />
        </div>
      )}
      <header
        className="flex px-4 gap-4 overflow-hidden transition-all items-center justify-between"
        style={{ height: headerExpanded ? UIVariable.headerHeight : 0 }}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex-1 flex">
          <Link to="/">
            <Logo />
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
                {showNavigation ? <PanelLeftClose /> : <PanelRightOpen />}
              </button>
              <button>
                <NotebookPen />
              </button>
              <button>
                <Search />
              </button>
            </>
          )}
        </div>

        <div className="flex">
          <Link to="/introduction">
            <Info />
          </Link>
          <LanguageSwitch />
          <ThemeSwitch />

          {pathname === "/test" && (
            <>
              <button className="black_btn">sign up</button>
              <button className="black_btn">sign in</button>
              <button className="black_btn">sign in with google</button>
            </>
          )}
        </div>

        {/* <button
          onClick={() => {
            dispatch({
              type: "ui/toggleHeaderDocked",
            });
          }}
        >
          {headerDocked ? "undocked" : "docked"}
        </button> */}
      </header>
    </>
  );
};

export default Header;
