import DraggableMarqueeGallery from "../ui/DraggableMarqueeGallery";
import { workGalleryData } from "@/datas/workData";

export default function WorkGallery() {
    return (
        <div className="w-full mb-15">
            <DraggableMarqueeGallery 
                items={[...workGalleryData, ...workGalleryData]} 
                className="py-5"
            />
        </div>
    );
}