import React from "react"
import { RoughNotation } from "react-rough-notation";

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 text-slate-200 bg-neutral-900 h-full rounded-md border border-neutral-700 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              Step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${currentStepIndex === 0 ? "text-[#ffe666]" : "text-white"
                } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color="#ffe666"
              >
                Causes Your Passionate About
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              Step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-sm ${currentStepIndex === 1 ? "text-[#bd284d]" : "text-white"
                } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color="#bd284d"
              >
                What sounds most exciting to you?
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-neutral-500 uppercase text-sm md:flex">
              Step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-sm ${currentStepIndex === 3 ? "text-[#6fe79f]" : "text-white"
                } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 3}
                color="#6fe79f"
              >
                Summary
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
