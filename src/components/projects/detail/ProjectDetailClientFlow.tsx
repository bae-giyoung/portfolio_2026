import type { ArchitecturePanel, ProjectDetail } from "@/datas/projectData";
import asterisk from "@/assets/icons/asterik.svg";
import Image from "next/image";
import UnorderedList01 from "@/components/ui/list/UnorderedList01";

type Props = {
    clientFlow: NonNullable<ProjectDetail["clientFlow"]>;
};

function Panel({ panel }: { panel: ArchitecturePanel }) {
    const isPrimary = panel.variant === "primary";
    const isForeground = panel.variant === "foreground";
    const isFull = panel.span === "full";

    const borderColors = isPrimary
        ? "border-app-primary/20 bg-app-primary/3"
        : isForeground
        ? "border-app-fg/10 bg-app-fg/2"
        : "border-app-fg/20 bg-app-bg";
    const labelColors = isPrimary
        ? "text-app-primary/60"
        : "text-app-fg/30";
    const dotColors = isForeground
        ? "foreground"
        : "primary";

    return (
        <div className={`p-6 xl:p-8 rounded-2xl border ${borderColors} ${isFull ? "md:col-span-2" : ""}`}>
            {panel.label && (
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${labelColors}`}>
                    {panel.label}
                </p>
            )}
            {panel.title && (
                <p className="text-sm leading-relaxed text-app-fg break-keep font-inst mb-5">
                    {panel.title}
                </p>
            )}
            {panel.description && panel.description.length > 0 && (
                panel.span === "full" ? (
                    <UnorderedList01 items={panel.description} />
                ) : (
                    <UnorderedList01 items={panel.description} color={dotColors} className="space-y-1" />
                )
            )}
        </div>
    );
}

export default function ProjectDetailClientFlow({ clientFlow }: Props) {
    return (
        <section className="w-full">
            <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-6">
                <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16} />클라이언트 진입 흐름
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientFlow.panels.map((panel, i) => (
                    <Panel key={i} panel={panel} />
                ))}
            </div>
        </section>
    );
}
