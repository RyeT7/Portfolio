import { ComponentType } from "react";
import {
    FaUniversity,
    FaRegCalendarAlt,
    FaGraduationCap,
    FaCertificate,
    FaIdBadge,
} from "react-icons/fa";
import { FloorMeta } from "../elevator/types.ts";

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Education</h1>

            <article className="role is-current">
                <h3>Master of Computer Science</h3>
                <div className="meta-list">
                    <span><FaUniversity aria-hidden="true" />BINUS University</span>
                    <span><FaGraduationCap aria-hidden="true" />Computer Science</span>
                    <span><FaRegCalendarAlt aria-hidden="true" />2026 - 2029</span>
                </div>
            </article>

            <article className="role is-current">
                <h3>Bachelor of Computer Science</h3>
                <div className="meta-list">
                    <span><FaUniversity aria-hidden="true" />BINUS University</span>
                    <span><FaGraduationCap aria-hidden="true" />Computer Science</span>
                    <span><FaRegCalendarAlt aria-hidden="true" />2023 - 2027</span>
                </div>
                <p className="floor-meta">GPA 3.94</p>
            </article>

            <h2>Certification</h2>

            <article className="role">
                <h3>Alibaba Cloud Certified Associate — Cloud Engineer</h3>
                <div className="meta-list">
                    <span><FaCertificate aria-hidden="true" />Issued May 2025</span>
                    <span><FaRegCalendarAlt aria-hidden="true" />Valid through May 2027</span>
                    <span><FaIdBadge aria-hidden="true" />IACA13250500210529L</span>
                </div>
            </article>
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Education',
    level: 2,
    label: 'Education',
    hint: 'Degrees and certifications.',
    accent: '#f48fb1',
}
