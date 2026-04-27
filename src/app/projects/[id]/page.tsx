
/* 레이아웃 어떻게 할 지 고민 중!!!!!! */

import ProjectDetailBackButton from "@/components/projects/detail/ProjectDetailBackButton";

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const numId = Number(id);

    console.log("페이지 ID: ", { numId });

    return (
        <>
            {/* 프로젝트 상세보기 페이지 */}
            <div className="w-full px-5 md:px-7.5 lg:px-18 pt-(--header-height) max-w-480 mx-auto font-inst break-keep">

                {/* 뒤로가기 */}
                <ProjectDetailBackButton />

                <div className="">
                    {numId}변 프로젝트 상세 페이지
                </div>
            </div>
        </>
    );
}
