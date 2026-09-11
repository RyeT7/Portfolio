import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <>
            <div className="floor">
                <h1>Template Floor</h1>
                <p>This is a template floor. Copy this file to create a new floor.</p>
            </div>
        </>
    )
}

export const meta: FloorMeta = {
    id: 'Template',
    level: -1,
    label: 'Template Floor',
    hint: 'This is the Template Floor.',
}