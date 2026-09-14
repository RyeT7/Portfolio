import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Projects</h1>
            <p>
                This floor is under construction — project write-ups will move in
                here. Ride back down to the lobby, or keep going up.
            </p>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Projects',
    level: 1,
    label: 'Projects',
    hint: 'A showcase of things I have built.',
    accent: '#4dd0e1',
}
