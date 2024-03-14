import { Button } from "@/components/ui/button"
import { unstable_noStore as noStore } from "next/cache";
import { CardContent, Card } from "@/components/ui/card"
import { checkAuth, getUserAuth } from "@/server/auth";
import { api } from "@/trpc/server";
import { z } from "zod";

import Image from "next/image"
import { CreateEvent } from "@/components/CreateEvent";

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
  console.log(new Date())


  const data = await api.projects.all.query({
    name: name
  })

  return (
    <div className="p-5">
      <div className="py-5">
        <h1 className="text-5xl font-bold">Events</h1>
        <div>RSVP to upcoming events</div>
        <div className="flex justify-between gap-5">
          <div />
          <div>
            <CreateEvent />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 md:gap-6">
          <Card className="bg-background text-primary">
            <CardContent className="flex items-start space-y-0 py-4">
              <Image
                alt="Event"
                className="rounded-lg object-cover"
                height="80"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              />
              <div className="space-y-1 ml-4 flex-1">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold leading-none">Test Event</h3>
                  <p className="text-sm text-gray-500 leading-none dark:text-gray-400">Mar 19th, 2024</p>
                </div>
                <p className="text-sm text-base leading-snug">
                  This is a test event that I have made
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <Button size="sm">RSVP</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

