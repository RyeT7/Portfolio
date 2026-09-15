import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

const stack: { label: string; items: string[] }[] = [
    { label: 'Languages', items: ['C#', 'Go', 'TypeScript', 'Rust', 'Java', 'Kotlin', 'Python'] },
    { label: 'Backend', items: ['.NET', 'Gin', 'NestJS', 'Spring Boot', 'REST', 'gRPC', 'WebSocket'] },
    { label: 'Frontend', items: ['React', 'Vue', 'Svelte', 'Vite', 'Tailwind'] },
    { label: 'Databases', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Azure CosmosDB', 'Supabase', 'Firebase'] },
    { label: 'Messaging & cache', items: ['RabbitMQ', 'Redis'] },
    { label: 'DevOps', items: ['Docker', 'Docker Swarm', 'Ansible', 'Terraform', 'Azure DevOps Server', 'IIS'] },
    { label: 'Cloud', items: ['Azure', 'Alibaba Cloud'] },
    { label: 'Desktop', items: ['Tauri'] },
];

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Stack</h1>
            <p className="floor-lead">
                Strongest in the C# / .NET / SQL Server / Azure lane, which is where the
                day job lives.

                Hobby and side projects are mostly in Go and TypeScript.
            </p>

            {stack.map((group) => (
                <div className="skill-row" key={group.label}>
                    <span>{group.label}</span>
                    <div className="tags">
                        {group.items.map((item) => (
                            <span className="tag" key={item}>{item}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Stack',
    level: 3,
    label: 'Stack',
    hint: 'Languages, frameworks, and infrastructure I work with.',
    accent: '#4dd0e1',
}
