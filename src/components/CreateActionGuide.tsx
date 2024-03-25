"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import AutoForm, { AutoFormSubmit } from "./ui/auto-form"
import { insertProjectParams } from "@/server/db/types/projects"
import { api } from "@/trpc/react";
import { toast } from "sonner"
import { extractNotionId, handleError } from "@/lib/utils"
import { z } from "zod"
import { insertGuideParams } from "@/server/db/types/guides"

export function CreateActionGuide() {

  const { mutate } = api.actionGuides.create.useMutation({
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
        <AutoForm formSchema={insertGuideParams.extend({
          embedId: z.string().url()
        })}
          fieldConfig={{
            embedId: {
              description: "The URL of the published page in Notion",
            }
          }}
          onSubmit={(e) => mutate({
            ...e,
            embedId: extractNotionId(e.embedId)
          })}
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
