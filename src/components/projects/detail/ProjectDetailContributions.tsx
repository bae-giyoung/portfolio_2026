import Image from "next/image";
import asterisk from "@/assets/icons/asterik.svg";
import UnorderedList01 from "@/components/ui/list/UnorderedList01";
import OrderedList01 from "@/components/ui/list/OrderedList01";

type Props = {
    responsibilities: string[];
    keyFeatures: string[];
};

export default function ProjectDetailContributions({
    responsibilities,
    keyFeatures,
}: Props) {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">                
                {/* 담당 업무 */}
                <div>
                    <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-6">
                        <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>담당 업무
                    </h2>
                    <OrderedList01 items={responsibilities} />
                </div>

                {/* 주요 기능 */}
                <div>
                    <h2 className="text-[16px] font-semibold uppercase tracking-widest text-app-fg/60 mb-6">
                        <Image src={asterisk} alt="Asterisk" className="inline-block mr-2" width={16} height={16}/>주요 기능
                    </h2>
                    <UnorderedList01 items={keyFeatures} />
                </div>
            </div>
        </section>
    );
}
