"use client";

import { Neucha } from "next/font/google";
import { useEffect, useReducer, useRef, useState } from "react";
import { steps } from "../_util/steps";
import { AnimatedTextDisplay } from "./AnimatedTextDisplay";
import ScrollableStepSection from "./ScrollableStepSection";

const blockyFont = Neucha({ subsets: ["latin"], weight: "400" });

export interface Step {
	clues: string[];
	guesses: string[];
	isDone: boolean;
}

export default function AnimatedHomeSection() {
	const [step, setStep] = useState<Step>(steps[0]);
	const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
	const [, rebuild] = useReducer((x) => x + 1, 0);
	const [isServer, setIsServer] = useState(true);
	useEffect(() => {
		setIsServer(false);
	}, []);
	const availableHeight = useRef<number>(0);
	if (containerRef) {
		const top = containerRef.getBoundingClientRect().top;
		if (top === 0) {
			availableHeight.current = window.innerHeight - top;
		}
	}

	useEffect(() => {
		window.addEventListener("resize", rebuild);
		return () => {
			window.removeEventListener("resize", rebuild);
		};
	}, []);

	const height = availableHeight.current;
	const width = typeof window === "undefined" ? 0 : window.innerWidth;

	return (
		<>
			{!isServer && width > 750 && (
				<ScrollableStepSection
					steps={steps}
					className={`bg-sky-900 ${availableHeight.current === 0 ? "hidden" : ""} ${blockyFont.className}`}
					onStepChange={(step): void => {
						setStep(step);
					}}
					stepHeight="32rem"
				>
					<div
						ref={(el) => setContainerRef(el)}
						style={{
							height: `${availableHeight.current}px`,
						}}
					>
						<AnimatedTextDisplay step={step} width={width} height={height} />
					</div>
				</ScrollableStepSection>
			)}
		</>
	);
}
