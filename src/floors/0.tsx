import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <>
            <div className="floor">
                <h1>About me</h1>
                <p>This is the About Me Floor.</p>
            </div>
        </>
    )
}

export const meta: FloorMeta = {
    id: 'AboutMe',
    level: 0,
    label: 'About Me Floor',
    hint: 'This is the About Me Floor, this floor contains information of',
}