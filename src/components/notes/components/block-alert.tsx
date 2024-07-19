import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/states/hooks";
import { useEffect } from "react";
import { useBlocker, useLocation } from "react-router";

const BlockAlert = () => {
  const { saving } = useAppSelector((state) => state.save);
  const location = useLocation();
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      saving && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const beforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = false;
    };
    if (saving) {
      window.addEventListener("beforeunload", beforeunload);
    }

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [saving]);

  return (
    <div>
      {blocker.state === "blocked" && (
        <>
          <Dialog defaultOpen={true}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  The changes haven't saved, are you absolutely sure to leave?
                </DialogTitle>
                <DialogDescription>
                  <button
                    className="black_btn"
                    onClick={() => blocker.proceed()}
                  >
                    go on
                  </button>
                  <button className="black_btn" onClick={() => blocker.reset()}>
                    cancel
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default BlockAlert;
