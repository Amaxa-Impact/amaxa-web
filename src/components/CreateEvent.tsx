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

export function CreateEvent() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AutoForm formSchema={insertEventsParams}>
          <AutoFormSubmit>
            Create Event
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
