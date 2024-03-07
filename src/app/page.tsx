import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { checkAuth, getUserAuth } from "@/server/auth";
import { api } from "@/trpc/server";
import { z } from "zod";
import Search from "@/components/Search";
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card";


const searchParamsSchema = z.object({
  name: z.string().optional(),
});


export default async function Home(props: {

  searchParams: Record<string, string | string[] | undefined>;
}) {
  noStore();
  await checkAuth()
  const { name } = searchParamsSchema.parse(props.searchParams);
  const { session } = await getUserAuth();


  const data = await api.projects.all.query({
    name: name
  })

  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="flex flex-row justify-between">
        <Search />
      </div>
      <div className="grid grid-rows-1 gap-10 md:grid-cols-2 md:grid-rows-2">
        {data.map((subject) => {
          return (
            <Link key={subject.id} href={`/project/${subject.id}`}>
              <Card className=" col-span-1 row-span-1 bg-primary-foreground transition-transform duration-200 hover:scale-105 hover:bg-muted">
                <CardContent className="py-5">
                  <Image
                    src={""}
                    width={1000}
                    height={500}
                    alt={String(subject.id)}
                  />
                </CardContent>
                <CardFooter className="justify-center text-center font-bold md:text-2xl">
                  {subject.name}
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );

}
