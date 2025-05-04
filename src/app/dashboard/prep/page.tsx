import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Drill } from "lucide-react"
import StravaActivities from "./StravaActivities"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Page() {
    return (
        <>
            <SidebarInset className="flex flex-col h-full w-full">
                <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        Training
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
                    <ToggleGroup type="multiple" variant="outline">
                        <ToggleGroupItem value="Algorythm" aria-label="Toggle Algorythm">
                            Algorythm
                        </ToggleGroupItem>
                        <ToggleGroupItem value="DeathAngel" aria-label="Toggle DeathAngel">
                            DeathAngel
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Alert className="sticky top-0">
                        <Drill className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            This section is Under Construction.
                        </AlertDescription>
                    </Alert>
                    <StravaActivities />
                </div>
            </SidebarInset>
        </>
    )
}
