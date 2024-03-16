import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ManageUserPermissions } from "./form"
import { UserPermissions } from "@/types/permissions"

//FIX: prop drilling
//FIX: Shit design
export default function Edit(props: {
  userId: string,
  currentPermissions: UserPermissions[]
}) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-3xl">Edit User Permissions</CardTitle>
        <CardDescription>Make changes to the user's permissions below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" readOnly value="Alice" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" readOnly value="alice@example.com" />
          </div>
        </div>

        <ManageUserPermissions user={{
          userId: props.userId,
          currentPermission: props.currentPermissions

        }} />
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Link className="flex-1" href="#">
          <Button className="w-full" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button className="flex-1 w-full">Save</Button>
      </CardFooter>
    </Card>
  )
}

