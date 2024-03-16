"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import AutoForm, { AutoFormSubmit } from "./ui/auto-form"
import { insertEventsParams } from "@/server/db/types/events"
import { insertProjectParams } from "@/server/db/types/projects"
import { api } from "@/trpc/react";
import { toast } from "sonner"
import { handleError } from "@/lib/utils"
import { z } from "zod"

export function CreateProjects() {

  const { mutate } = api.projects.create.useMutation({
    onSuccess() {
      toast.success("Created Succesfull")
    },
    onError(error) {
      handleError(error)
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AutoForm formSchema={insertProjectParams.extend({
          startDate: z.coerce.date()
          //FIX: Make textboxes and not inputs 

        })} fieldConfig={{
          startDate: {
            fieldType: "date"
          }
        }}
          onSubmit={(e) => {
            mutate({
              ...e,
              startDate: e.startDate!.toISOString() || new Date().toISOString()
            })

          }}
        >
          <AutoFormSubmit>
            Create Projects
          </AutoFormSubmit>
        </AutoForm>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
