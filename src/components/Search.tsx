"use client";
import { usePathname, useRouter } from "next/navigation";
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
