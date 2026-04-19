

import CurtainIntro from "@/components/home/CurtainIntro";
import NameModalButton from "@/components/home/NameModalButton";
import Header from "@/components/layout/Header";

export default function Home() {
	return (
		<>
			<CurtainIntro />
			<main id="main" className="w-full h-screen flex items-center justify-center relative font-inst">
				<h2 className="hero-text text-4xl sm:text-6xl font-medium tracking-tight text-app-fg text-left md:text-center leading-snug">
					<span className="inline-block mr-6">Hello,</span>
					<br className="block md:hidden" />
					<span className="inline-block mr-2 font-serif">I</span>
					<span className="inline-block mr-6 font-serif italic">am</span>
					<NameModalButton />
					<span className="inline-block mr-2 w-7.5 in-[.is-loading]:w-0 transition-all duration-700 overflow-hidden leading-none">_</span>
					<span className="inline-block font-space animate-pulse text-[#189e48]">*</span>
				</h2>
			</main>
			<section id="profile" className="relative w-full min-h-screen bg-amber-50">섹션1 profile</section>
			<section id="projects" className="relative w-full min-h-screen bg-emerald-300">섹션2 projects</section>
			<section id="works" className="relative w-full min-h-screen bg-emerald-300">섹션3 works</section>
			<footer className="relative w-full h-80 bg-app-fg text-app-bg">footer</footer>
		</>
	);
}
