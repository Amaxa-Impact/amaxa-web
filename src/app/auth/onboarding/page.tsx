"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import CausesForm from "@/components/onboarding/CausesForms";
import PreferencesForm from "@/components/onboarding/PreferencesForm";
import SuccessMessage from "@/components/onboarding/SuccessMessage";
import SideBar from "@/components/OnboardingSidebar";
import { useMultiStepForm } from "@/app/hooks/useMultiStepForm";
import { FormItems } from "@/types/onboarding";
import FinalStep from "@/components/onboarding/FinalStep";


const initialValues: FormItems = {
  contactPref: "both",
  funding: false,
  pref: [
    {
      id: 1,
      checked: true,
      title: "Health",
    },
    {
      id: 2,
      checked: false,
      title: "Climate",
    },
    {
      id: 3,
      checked: false,
      title: "Education",
    },
    {
      id: 4,
      checked: false,
      title: "Poverty"
    },
    {
      id: 5,
      checked: false,
      title: "Refugees"
    },
    {
      id: 6,
      checked: false,
      title: "Gender Equality"
    },
    {
      id: 7,
      checked: false,
      title: "Peace"
    }
  ],
};

export default function Home() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiStepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">

      <h1 className="text-4xl font-bold text-red-500">THIS IS UNDER HEAVY CONSTRUCTION - IGNORE FOR NOW</h1>
      <div
        className={`flex justify-between ${currentStepIndex === 1 ? "h-min-[900px] md:h-min-[900px]" : "h-[500px]"
          } w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4`}
      >
        {!showSuccessMsg ? (
          <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
        ) : (
          ""
        )}
        <main
          className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
        >
          {showSuccessMsg ? (
            <AnimatePresence mode="wait">
              <SuccessMessage />
            </AnimatePresence>
          ) : (
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col justify-between h-full"
            >
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <CausesForm key="step1" {...formData} updateForm={updateForm} />
                )}
                {currentStepIndex === 1 && (
                  <PreferencesForm key="step2" {...formData} updateForm={updateForm} />
                )}
                {currentStepIndex === 3 && (
                  <FinalStep key="step3" {...formData} goTo={goTo} />
                )}
              </AnimatePresence>
              <div className="w-full items-center flex justify-between">
                <div className="">
                  <Button
                    onClick={previousStep}
                    type="button"
                    variant="ghost"
                    className={`${isFirstStep
                      ? "invisible"
                      : "visible p-0 text-neutral-200 hover:text-white"
                      }`}
                  >
                    Go Back
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                    <Button
                      type="submit"
                      className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-black/10 rounded-xl hover:text-white"
                    >
                      {isLastStep ? "Confirm" : "Next Step"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
