import { ComponentType } from "react";
import { FaCode, FaDatabase, FaUniversity, FaClock } from "react-icons/fa";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <div className="profile">
                <img className="profile-photo" src="/me.jpg" alt="Ryuu Stanley" />

                <div className="profile-text">
                    <h1>Ryuu Stanley</h1>
                    <div className="profile-roles">
                        <span><FaCode aria-hidden="true" />Software Engineer</span>
                        <span><FaDatabase aria-hidden="true" />Database Administrator</span>
                    </div>
                    <div className="meta-list">
                        <span><FaUniversity aria-hidden="true" />BINUS University</span>
                        <span><FaClock aria-hidden="true" />UTC+07:00</span>
                    </div>
                </div>
            </div>

            <p className="floor-lead">
                I build backend services and deployment tooling, and keep databases
                running in production.
            </p>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'AboutMe',
    level: 0,
    label: 'About Me',
    hint: 'The lobby — who I am and what I work on.',
    accent: '#ffb020',
}
