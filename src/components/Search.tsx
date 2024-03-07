"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";

//FIX: Add debounce
export default function Search() {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(v: string) {
    if (v == "" || v == " ") {
      router.push(pathname);
    }
    router.push(`${pathname}/?name=${v}`);
  }

  return (
    <div className="w-1/2">
      <Input
        className="h-6 md:h-12"
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
}

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "Math",
    label: "Math",
  },
  {
    value: "Science",
    label: "Science",
  },
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Social Studies",
    label: "Social Studies",
  },
  {
    value: "World Languages",
    label: "World Languages",
  },
  {
    value: "English",
    label: "English",
  },
  {
    value: "Debate",
    label: "Debate",
  },
  {
    value: "clear",
    label: "Clear",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("catagory") ?? "");

  function handleChange(value: string) {
    if (value == "" || value == " " || value == null || value === "clear") {
      return router.push(pathname);
    }
    setValue(value);
    router.push(`${pathname}/?catagory=${value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select a catagory..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search catagories..." className="h-9" />
          <CommandEmpty>No catagory found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  handleChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label ?? "Clear"}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
