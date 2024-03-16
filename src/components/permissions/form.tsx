"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import AutoForm from "../ui/auto-form";
import { toast } from "sonner";
import { handleError } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { UserPermissions, user_permissions } from "@/types/permissions";

//FIX: Add username editting and decouble auto changes
export function ManageUserPermissions(props: {
  user: {
    userId: string;
    currentPermission: UserPermissions[];
  };
}) {
  const { user } = props;
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<Partial<FormSchema>>({});

  useEffect(() => {
    setInitialValues(getDefaultValues());
  }, [user.currentPermission]); // Update default values when user's permissions change

  // Define form schema with optional boolean fields
  const formSchema = z.object(
    user_permissions.reduce(
      (acc, permission) => {
        acc[permission] = z.boolean().optional();
        return acc;
      },
      {} as Record<UserPermissions, z.ZodOptional<z.ZodBoolean>>,
    ),
  );
  type FormSchema = z.infer<typeof formSchema>;

  // useCallback to memoize getDefaultValues function
  const getDefaultValues = useCallback(() => {
    return formSchema.parse(
      user_permissions.reduce((acc, permission) => {
        acc[permission] = user.currentPermission.includes(permission);
        return acc;
      }, {} as Partial<FormSchema>),
    );
  }, [user.currentPermission, formSchema]); // Dependency array includes user's current permissions

  const { mutate } = api.user.update.useMutation({
    onSuccess() {
      toast.success("Permissions updated");
    },
    onError(error) {
      handleError(error);
    },
  });

  function handleSubmit(values: FormSchema) {
    const isDifferent = user_permissions.some(
      (permission) => initialValues[permission] !== values[permission],
    );
    if (!isDifferent) return; // Do nothing if values haven't changed
    const updatedPermissions = new Set(user.currentPermission);

    for (const permission of user_permissions) {
      if (values[permission]) {
        updatedPermissions.add(permission);
      } else {
        updatedPermissions.delete(permission);
      }
    }

    mutate({
      userId: user.userId,
      permissions: Array.from(updatedPermissions),
    });
    router.refresh();
  }

  function handleGiveAllPermissions() {
    const allPermissions = user_permissions.reduce((acc, permission) => {
      if (permission !== "none") {
        acc[permission] = true;
      }
      return acc;
    }, {} as Partial<FormSchema>);

    setInitialValues(allPermissions);
    handleSubmit(allPermissions as FormSchema);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-start gap-20">
        <Button onClick={handleGiveAllPermissions} variant={"outline"}>
          Give all permissions
        </Button>
      </div>
      <AutoForm
        values={getDefaultValues()}
        onValuesChange={handleSubmit}
        formSchema={formSchema}
      ></AutoForm>
    </div>
  );
}
