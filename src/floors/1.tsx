import { ComponentType } from "react";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaBuilding, FaFileContract } from "react-icons/fa";
import { FloorMeta } from "../elevator/types.ts";

interface Role {
    title: string;
    org: string;
    period: string;
    location: string;
    mode: string;
    type?: string;
    current?: boolean;
    points: string[];
}

const roles: Role[] = [
    {
        title: 'Database Administrator',
        org: 'BINUS University — Software Laboratory Centre',
        period: 'Mar 2026 — Present',
        location: 'Jakarta, Indonesia',
        mode: 'On-site',
        type: 'Contract',
        current: true,
        points: [
            'Migrated the SLC production database from SQL Server 2016 to 2022, raising compatibility levels and validating query plans to avoid regressions.',
            'Built the tool and pipeline that automates deploying internal software to IIS, working inside the memory limits of a shared production VM — released as Columbidae, on the Projects floor.',
            'Traced intermittent timeouts across several core operations to parameter sniffing and tuned them, cutting worst-case run times substantially.',
            'Maintain the SLC database and Atlantis, the division’s internal software (.NET Core, React + TypeScript).',
            'Publish lab scores for students across the Jakarta, Bekasi, Semarang, Malang, and Medan campuses, spanning seven laboratory divisions, and run QA over the results.',
            'Calculate assistant and employee honoraria for case-making and correction work, and set practicum dates including score publication, protest, and revision windows.',
            'Coordinate with divisions across BINUS and with the SLC R&D team.',
        ],
    },
    {
        title: 'Laboratory Assistant',
        org: 'BINUS University — Software Laboratory Centre',
        period: 'Sep 2024 — Present',
        location: 'Jakarta, Indonesia',
        mode: 'On-site',
        current: true,
        points: [
            'Teach software materials hands-on, and supervise the training of new assistants.',
            'NARWaL — full-stack Spring Boot / Vue tool that auto-allocates schedules and tasks for SLC training events.',
            'FORyoU — Kotlin / Firebase Android app helping students find friends and coordinate activities, backed by an internal BINUS API.',
            'Author training cases for new assistants, including a Tauri desktop app scoped from an interview transcript — a format I proposed and first implemented.',
        ],
    },
    {
        title: 'IT Division Intern',
        org: 'Bina Nusantara',
        period: 'Feb 2026 — Jul 2026',
        location: 'Jakarta, Indonesia',
        mode: 'Hybrid',
        points: [
            'Built a RAG-based AI corrector and helped integrate it into the official BINUS LMS within an Azure environment.',
        ],
    },
];

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Experience</h1>

            {roles.map((role) => (
                <article className={`role ${role.current ? 'is-current' : ''}`} key={role.title}>
                    <h3>{role.title}</h3>
                    <p className="role-org">{role.org}</p>
                    <div className="meta-list">
                        <span><FaRegCalendarAlt aria-hidden="true" />{role.period}</span>
                        <span><FaMapMarkerAlt aria-hidden="true" />{role.location}</span>
                        <span><FaBuilding aria-hidden="true" />{role.mode}</span>
                        {role.type ? (
                            <span><FaFileContract aria-hidden="true" />{role.type}</span>
                        ) : null}
                    </div>
                    <ul>
                        {role.points.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                </article>
            ))}

        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Experience',
    level: 1,
    label: 'Experience',
    hint: 'Where I work and what I have shipped.',
    accent: '#ba8fff',
}
