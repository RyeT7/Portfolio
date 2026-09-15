import { ComponentType } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Get in touch</h1>
            <p className="floor-lead">
                Open to conversations about database work, deployment tooling, and
                backend engineering. Based at UTC+07:00.
            </p>

            <div className="links">
                <a href="mailto:stanley05ryuu@gmail.com">
                    <FaEnvelope size={17} aria-hidden="true" />
                    stanley05ryuu@gmail.com
                </a>
                <a
                    href="https://github.com/RyeT7"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <FaGithub size={17} aria-hidden="true" />
                    github.com/RyeT7
                </a>
                <a
                    href="https://www.linkedin.com/in/ryuu-stanley-t/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <FaLinkedin size={17} aria-hidden="true" />
                    linkedin.com/in/ryuu-stanley-t
                </a>
            </div>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Contact',
    level: -1,
    label: 'Contact',
    hint: 'Email, GitHub, and LinkedIn.',
    accent: '#ff6f61',
}
