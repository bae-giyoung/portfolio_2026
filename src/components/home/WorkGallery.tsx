import DraggableMarqueeGallery from "../ui/DraggableMarqueeGallery";
import { workGalleryData } from "@/datas/workData";

export default function WorkGallery() {
    return (
        <div className="w-full mb-20 mt-5">
            <DraggableMarqueeGallery 
                items={[...workGalleryData, ...workGalleryData]} 
            />
        </div>
    );
}