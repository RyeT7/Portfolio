import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Get in touch</h1>
            <p>
                Contact details go here. Head back up to the lobby whenever you're
                ready to leave the building.
            </p>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Contact',
    level: -1,
    label: 'Contact',
    hint: 'How to reach me.',
    accent: '#ff6f61',
}
