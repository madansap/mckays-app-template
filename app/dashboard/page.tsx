import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import CreateInterface from "./_components/create-interface"

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/login?redirect_url=/dashboard")
  }

  return <CreateInterface />
}
