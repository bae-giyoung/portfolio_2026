import type { ProjectDetail } from "@/datas/projectData";
import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";

type TechStackCategory = {
    label: string;
    items: string[];
};

export default function ProjectDetailTechStack({
    techStack,
}: {
    techStack: ProjectDetail["techStack"];
}) {
    const categories: TechStackCategory[] = [
        { label: "프론트엔드", items: techStack.frontend },
        { label: "백엔드", items: techStack.backend },
        { label: "Data / AI", items: techStack.dataAi },
        { label: "DB", items: techStack.database },
        { label: "Tools", items: techStack.tools },
    ].filter((c) => c.items.length > 0);

    return (
        <section className="w-full">
            <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-6">
                <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>기술 스택
            </h2>
            <div className="flex flex-col gap-5">
                {categories.map(({ label, items }) => (
                    <div key={label} className="flex items-start gap-3">
                        <span className="w-28 shrink-0 text-[14px] font-bold text-app-fg pt-1.5 uppercase tracking-wide">
                            {label}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <span
                                    key={item}
                                    className="px-1.5 py-1 text-[14px] border border-app-fg/15 rounded-full font-semibold text-app-fg hover:border-app-primary/40 hover:text-app-primary transition-colors duration-200"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
