'use client';
import NaviButton from "./NaviButton";

export default function Logo({
    className = "",
} : {
    className?: string;
}) {
    return (
        <NaviButton href={"#main"} className={`static lg:absolute left-1/2 lg:-translate-x-1/2 top-1/2 lg:-translate-y-1/2 ${className}`}>
            <div id="logo">
                <h1 className="font-serif text-left lg:text-center text-[26px] lg:text-[40px] leading-none">
                    <span className="inline-block lg:block mr-4">Gi Young</span>
                    <span className="inline-block lg:block">Bae</span>
                    <span className="sr-only">PortFolio</span>
                </h1>
            </div>
        </NaviButton>
    );
}