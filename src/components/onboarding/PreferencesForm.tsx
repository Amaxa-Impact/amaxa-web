"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FormWrapper from "./FormWrapper";
import { FormItems, Prefr } from "@/types/onboarding";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};


const PreferencesForm = ({ updateForm, contactPref: preferences, funding }: stepProps) => {
  const [wantsToFundraise, setWantsToFundraise] = useState(funding);
  const [planSelected, setPlanSelected] = useState<Prefr>(preferences);

  const handleCheckedChange = (yearlyUpdated: boolean) => {
    setWantsToFundraise((prev) => !prev);
    updateForm({ funding: yearlyUpdated });
  };

  const handleValueChange = (planSelected: Prefr) => {
    if (planSelected) {
      setPlanSelected(planSelected);
      updateForm({ contactPref: planSelected });
    }
  };

  return (
    <FormWrapper
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <ToggleGroup.Root
        orientation="horizontal"
        className="flex flex-col gap-3 my-2 md:flex-row md:items-center md:justify-between md:gap-0"
        type="single"
        value={planSelected}
        onValueChange={handleValueChange}
      >
        <ToggleGroup.Item
          value="direct-contact"
          className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 focus:border-[#77f6aa] outline-none hover:border-[#77f6aa] md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="text-white font-semibold">

              Interacting directly with the people I’m helping
            </p>
          </div>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="passions"
          className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 focus:border-[#77f6aa] outline-none hover:border-[#77f6aa] md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
        >
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="text-white font-semibold">
              A project where I use my passions to raise money to make an impact
            </p>
          </div>
        </ToggleGroup.Item>

        <ToggleGroup.Item
          className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-[#77f6aa] data-[state=on]:bg-neutral-900 focus:border-[#77f6aa] outline-none hover:border-[#77f6aa] md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
          value="both"
        >
          <div className="relative -top-1 flex flex-col items-start md:top-0">
            <p className="text-white font-semibold">Both!</p>
          </div>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div className="w-full flex items-center justify-center bg-neutral-900 p-3 rounded-md">
        <div className="flex items-center gap-6">
          <Label
            htmlFor="airplane-mode"
            className={"text-[#77f6aa]"}
          >
            I don't want to fundraise for the project
          </Label>
          <Switch
            id="airplane-mode"
            checked={wantsToFundraise}
            onCheckedChange={handleCheckedChange}
          />
          <Label
            htmlFor="airplane-mode"
            className={funding ? "text-[#77f6aa]" : ""}
          >

            I want to fundraise for the project
          </Label>
        </div>
      </div>
    </FormWrapper>
  );
};

export default PreferencesForm;
