"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useHelp } from "@/hooks/use-help";
import { Label } from "@/components/ui/label";
import ContactForm from "@/components/contact-form";





export const HelpModal=()=>{
    const help = useHelp()

    return(
        <Dialog open={help.isOpen} onOpenChange={help.onClose} >
            
            <DialogContent className="overflow-y-auto">
                
            <div className="h-120">
                <ContactForm />
            </div>
            </DialogContent>
            </Dialog>
    )
}