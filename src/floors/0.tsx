import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>About Me</h1>
            <p>
                Welcome to the lobby. Ride the panel on the right (or scroll / swipe)
                to visit the other floors of this building.
            </p>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'AboutMe',
    level: 0,
    label: 'About Me',
    hint: 'The lobby — who I am and what I do.',
    accent: '#ffb020',
}
