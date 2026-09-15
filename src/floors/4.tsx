import { ComponentType } from "react";
import { FloorMeta } from "../elevator/types.ts";

interface Project {
    name: string;
    repo: string;
    tags: string[];
    body: string;
}

const featured: Project[] = [
    {
        name: 'Columbidae',
        repo: 'https://github.com/RyeT7/Columbidae',
        tags: ['PowerShell', 'IIS', 'GitHub Releases', 'CD'],
        body:
            'A pull-based continuous deployment tool for Windows IIS hosts where no persistent CI agent can run and nothing may connect inward. GitHub Actions publishes artifacts outbound to Releases; a scheduled PowerShell script polls for new ones, extracts into a timestamped folder, repoints the IIS site, and health-checks the result. A failed check rolls back by pointing the site at the previous folder. Stateless between runs, with log rotation, optional webhooks, and support for multiple apps under one site.',
    },
    {
        name: 'Coretax-EToX',
        repo: 'https://github.com/RyeT7/Coretax-EToX',
        tags: ['Rust', 'Tauri', 'Vue 3', 'TypeScript'],
        body:
            'A desktop tool that converts tax invoice data from Excel into the XML format Coretax expects, removing a manual reformatting step for the finance side. Built as a Tauri app so it ships as a native binary rather than something finance staff have to run in a browser.',
    },
    {
        name: 'ay.com',
        repo: 'https://github.com/RyeT7/ay.com',
        tags: ['Go', 'React', 'Microservices'],
        body:
            'An X/Twitter clone built as a microservice system, a self-directed software engineering exercise in service boundaries and inter-service communication rather than a product attempt.',
    },
    {
        name: 'ClassRUm',
        repo: 'https://github.com/RyeT7/ClassRUm',
        tags: ['NestJS', 'Prisma', 'JWT Passport', 'Microservices'],
        body:
            'A learning management system backend on a microservice architecture, using Prisma for data access and JWT Passport for authentication.',
    },
    {
        name: 'VorteKia',
        repo: 'https://github.com/RyeT7/VorteKia',
        tags: ['Tauri', 'React', 'TypeScript', 'Rust'],
        body:
            'A carnival management desktop application, built as a software engineering self-development project with the architecture diagrammed up front rather than grown ad hoc.',
    },
    {
        name: 'Commissary',
        repo: 'https://github.com/RyeT7/Commissary-BE',
        tags: ['Go', 'Vue'],
        body:
            'A two-part application for video streaming split across repositories, a Go backend and a Vue frontend.',
    },
];

const earlier: Project[] = [
    {
        name: 'OneDRUve',
        repo: 'https://github.com/RyeT7/OneDRUve',
        tags: ['Java', 'DDD'],
        body:
            'A console-based file management system simulator structured with domain-driven design and several deliberate design pattern implementations.',
    },
    {
        name: 'DaResto',
        repo: 'https://github.com/RyeT7/DaResto',
        tags: ['Java', 'Concurrency'],
        body:
            'A console game built on multithreading, implementing the observer, factory, mediator, and state patterns.',
    },
    {
        name: 'DiscoRUdo',
        repo: 'https://github.com/RyeT7/DiscoRUdo',
        tags: ['Java', 'JavaFX'],
        body:
            'A Discord replication in JavaFX backed by database polling, built as a training tool for new employees.',
    },
    {
        name: 'Nuclear Stock Prediction (LSTM)',
        repo: 'https://github.com/RyeT7/Nuclear-Stock-Market-Prediction-Using-LSTM',
        tags: ['Python', 'LSTM'],
        body:
            'Stock movement prediction for nuclear-sector equities using an LSTM, built for an AI training project.',
    },
    {
        name: 'Cloth Classifier',
        repo: 'https://github.com/RyeT7/Computer-Vision-Cloth-Classifier',
        tags: ['Python', 'Computer Vision'],
        body:
            'A computer vision classifier for clothing images, worked through in notebook form.',
    },
];

function Card(props: { project: Project }) {
    const { project } = props;
    return (
        <article className="project">
            <h3>
                <a href={project.repo} target="_blank" rel="noreferrer noopener">
                    {project.name}
                </a>
            </h3>
            <div className="tags">
                {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                ))}
            </div>
            <p>{project.body}</p>
        </article>
    );
}

export const defaultComponent: ComponentType = () => {
    return (
        <div className="floor">
            <h1>Projects</h1>

            <h2>Featured</h2>
            {featured.map((project) => (
                <Card project={project} key={project.name} />
            ))}

            <h2>Earlier work</h2>
            {earlier.map((project) => (
                <Card project={project} key={project.name} />
            ))}
        </div>
    )
}

export const meta: FloorMeta = {
    id: 'Projects',
    level: 4,
    label: 'Projects',
    hint: 'Deployment tooling, backend services, and architecture practice.',
    accent: '#9ccc65',
}
