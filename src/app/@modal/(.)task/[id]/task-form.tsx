"use client"
import { RouterOutputs } from '@/trpc/shared'
import { Combobox } from "@/components/ui/combobox";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from 'react'
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/trpc/react';
import { cn, handleError } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const schema = z.object({
  name: z.string(),
  assigne: z.string(),
  assigneName: z.string(),
  endDate: z.date(),
})

type Data = z.infer<typeof schema>

export const TaskForm = ({
  data,
  users,
  id
}: {
  data: Data
  users: RouterOutputs["user"]["byProjectId"]
  id: string

}) => {
  const { mutate: update } = api.tasks.update.useMutation({
    onSuccess() {
      toast.success("Updated Succesfull")
    },
    onError(error) {
      handleError(error)
    },
  })
  const formSchema = schema.omit({
    id: true,
    assigneName: true
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...data
    },
  });



  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userName = users.find((user) => user.value == values.assigne)!.value || data.assigneName
    update({
      id: id,
      data: {
        ...values,
        assigneName: userName
      }
    })

  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4"
        >

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"assigne"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    options={users}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
