import UnorderedList01 from "@/components/ui/list/UnorderedList01";
import type { ProjectDetail } from "@/datas/projectData";

type Props = {
    background: ProjectDetail["background"];
    impact: string[];
};

export default function ProjectDetailOverview({
    background,
    impact,
}: Props) {
    return (
        <section className="w-full">
            <h2 className="sr-only">프로젝트 개요</h2>

            {/* 문제 / 해결 */}
            <div className="flex flex-col gap-8 xl:gap-12">
                <div className="p-6 xl:p-8 rounded-2xl border border-app-fg/10 bg-app-fg/2">
                    <h3 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/70 dark:text-app-fg mb-4">
                        문제 배경
                    </h3>
                    <p className="text-[15px] leading-relaxed text-app-fg break-keep">
                        {background}
                    </p>
                </div>
                <div className="p-6 xl:p-8 rounded-2xl border border-app-primary/20 bg-app-primary/3">
                    <h3 className="text-[16px] font-semibold uppercase tracking-widest text-app-primary dark:text-app-fg mb-4">
                        성과
                    </h3>
                    <div className="text-[15px] leading-relaxed text-app-fg break-keep">
                        <UnorderedList01 items={impact} color="primary" emphasisTopN={1} />
                    </div>
                </div>
            </div>
        </section>
    );
}
