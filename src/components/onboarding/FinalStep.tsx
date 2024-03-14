"use client";

import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/types/onboarding";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ contactPref: preferences, pref: label, goTo }: StepProps) => {
  let planPrice = 0;
  switch (preferences) {
    case "passions":
      planPrice = 9;
      break;
    case "both":
      planPrice = 12;
      break;
    case "direct-contact":
      planPrice = 15;
      break;
    default:
      planPrice = 0;
      break;
  }

  const filteredAddOns = label.filter((addOn) => addOn.checked === true);


  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="">
        <div className="bg-neutral-900 p-4 mt-2 rounded-md border border-neutral-700">
          <div className="flex justify-between items-center">
            <div className="">
              <h4 className="font-semibold text-white md:text-lg">
              </h4>
              <button
                onClick={() => goTo(1)}
                className="text-[#6fe79f] text-sm"
              >
                Change
              </button>
            </div>
          </div>
          {filteredAddOns.length > 0 && <Separator className="my-4" />}
          {filteredAddOns?.map((addOn) => (
            <div
              className="flex justify-between items-center my-2"
              key={addOn.id}
            >
              <p className="text-neutral-400">{addOn.title}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center my-4 px-4">
          <p className="text-neutral-400">
          </p>
          <p className="text-[#6fe79f] font-semibold md:text-lg">
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

export default FinalStep;
