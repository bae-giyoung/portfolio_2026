import { ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectDetail } from "@/datas/projectData";

type Links = ProjectDetail["links"];

type LinkItemProps = {
    href: string;
    label: string;
    icon: React.ElementType;
    external?: boolean;
};

function LinkItem({ href, label, icon: Icon, external = false }: LinkItemProps) {
    const props = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <a
            href={href}
            {...props}
            className="inline-flex items-center gap-2.5 px-5 py-3 border border-app-fg/20 rounded-xl text-sm font-medium text-app-fg/70 hover:border-app-fg hover:text-app-fg transition-all duration-200 group"
        >
            <Icon
                size={16}
                aria-hidden="true"
                className="text-app-fg/40 group-hover:text-app-primary transition-colors duration-200"
            />
            {label}
        </a>
    );
}

export default function ProjectDetailLinks({ links }: { links: Links }) {
    const hasAny = links.github || links.demo || links.docs;

    if (!hasAny) return null;

    return (
        <section className="w-full mt-6">
            {/* <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-5">
                <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>링크
            </h2> */}
            <div className="flex flex-wrap gap-3">
                {links.github && (
                    <LinkItem
                        href={links.github}
                        label="GitHub"
                        icon={FaGithub}
                        external
                    />
                )}
                {links.demo && (
                    <LinkItem
                        href={links.demo}
                        label="Live Demo"
                        icon={ExternalLink}
                        external
                    />
                )}
                {links.docs && (
                    <LinkItem
                        href={links.docs}
                        label="리포트"
                        icon={FileText}
                        external={links.docs.startsWith("http") || links.docs.endsWith(".pdf")}
                    />
                )}
                {links.presentation && (
                    <LinkItem
                        href={links.presentation}
                        label="발표자료"
                        icon={FileText}
                        external={links.presentation.startsWith("http") || links.presentation.endsWith(".pdf")}
                    />
                )}
            </div>
        </section>
    );
}
