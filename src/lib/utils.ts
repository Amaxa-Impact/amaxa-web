import { type ClassValue, clsx } from "clsx"
import { Column, ColumnBaseConfig, ColumnDataType, like, notLike, eq, not } from "drizzle-orm";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function handleError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast.error(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error("Something went wrong, please try again later.");
  }
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function filterColumn({
  column,
  value,
}: {
  column: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  value: string;
}) {
  const [filterValue, filterVariety] = value?.split(".") ?? [];

  switch (filterVariety) {
    case "contains":
      return like(column, `%${filterValue}%`);
    case "does not contain":
      return notLike(column, `%${filterValue}%`);
    case "is":
      return eq(column, filterValue);
    case "is not":
      return not(eq(column, filterValue));
    default:
      return like(column, `%${filterValue}%`);
  }
}

export function extractNotionId(url: string) {
  const match = url.match(/([a-f0-9]{32})/);
  return match ? `a${match[1]}` : null;
}
