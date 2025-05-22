import { Button } from "@/components/ui/button"

import { Logo } from "./Logo"

import { Copyright } from "lucide-react"

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          <Copyright className="h-4 w-4 " />Nithin 2025. All rights reserved. 
        </Button>
        
      </div>
    </div>
  )
}