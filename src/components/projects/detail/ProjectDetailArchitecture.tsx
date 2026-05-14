import type { ProjectDetail } from "@/datas/projectData";
import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";
import UnorderedList01 from "@/components/ui/list/UnorderedList01";

type Props = {
    architecture: ProjectDetail["architecture"];
};

export default function ProjectDetailArchitecture({ architecture }: Props) {
    return (
        <section className="w-full">
            <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-6">
                <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>아키텍처
            </h2>
            {
                architecture.diagram && 
                <div>
                    {architecture.diagram.src &&
                    <div className="rounded-2xl border border-app-fg/10 bg-app-fg/[0.02] p-4 flex items-center justify-center">
                        <Image
                            src={architecture.diagram.src}
                            alt={`${architecture.diagram.alt || "Architecture Diagram"}`}
                            width={600}
                            height={400}
                            priority
                            className="object-contain"
                        />
                    </div>}
                    {architecture.diagram.title && (
                        <p className="text-sm leading-relaxed text-app-fg break-keep font-inst mb-5">
                            {architecture.diagram.title}
                        </p>
                    )}
                    {architecture.diagram.description && architecture.diagram.description.length > 0 && (
                        <UnorderedList01 items={architecture.diagram.description} className="mt-5" />
                    )}
                </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                {architecture.before && <div className="p-6 xl:p-8 rounded-2xl border border-app-fg/10 bg-app-fg/[0.02]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-app-fg/30 mb-4">
                        Before
                    </p>
                    {architecture.before.title && (
                        <p className="text-sm leading-relaxed text-app-fg break-keep font-inst mb-5">
                            {architecture.before.title}
                        </p>
                    )}
                    {architecture.before.description && architecture.before.description.length > 0 && (
                        <ul className="space-y-1">
                            {architecture.before.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-app-fg/65 break-keep font-inst">
                                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-app-fg/40" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
                {/* After */}
                {architecture.after && <div className="p-6 xl:p-8 rounded-2xl border border-app-primary/20 bg-app-primary/[0.03]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-app-primary/60 mb-4">
                        After
                    </p>
                    {architecture.after.title && (
                        <p className="text-sm leading-relaxed text-app-fg break-keep font-inst mb-5">
                            {architecture.after.title}
                        </p>
                    )}
                    {architecture.after.description && architecture.after.description.length > 0 && (
                        <ul className="space-y-1">
                            {architecture.after.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-app-fg/70 break-keep font-inst">
                                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-app-primary/60" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
            </div>
        </section>
    );
}
