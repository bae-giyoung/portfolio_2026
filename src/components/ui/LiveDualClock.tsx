'use client';

import { useEffect, useState } from "react";

const MINUTE_MS = 60_000;
const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;

const utcFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
});

const seoulFormatter = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
});

type TimeSnapshot = {
    label: string;
    dateTime: string;
};

function pad2(value: number) {
    return String(value).padStart(2, "0");
}

function formatUtc(now: Date) {
    try {
        return utcFormatter.format(now);
    } catch {
        return `${pad2(now.getUTCHours())}:${pad2(now.getUTCMinutes())}`;
    }
}

function formatSeoul(now: Date) {
    try {
        return seoulFormatter.format(now);
    } catch {
        const kst = new Date(now.getTime() + now.getTimezoneOffset() * 60_000 + SEOUL_OFFSET_MS);
        return `${pad2(kst.getHours())}:${pad2(kst.getMinutes())}`;
    }
}

function getSnapshot(now: Date): TimeSnapshot {
    return {
        label: `UTC: ${formatUtc(now)} / Seoul: ${formatSeoul(now)}`,
        dateTime: now.toISOString(),
    };
}

export default function LiveDualClock({ className = "inline-block text-sm" }: { className?: string }) {
    const [snapshot, setSnapshot] = useState<TimeSnapshot | null>(null);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const update = () => {
            setSnapshot(getSnapshot(new Date()));
        };

        const scheduleNext = () => {
            const now = new Date();
            const msUntilNextMinute = MINUTE_MS - (now.getSeconds() * 1000 + now.getMilliseconds());
            timeoutId = setTimeout(() => {
                update();
                scheduleNext();
            }, msUntilNextMinute);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            } else {
                update();
                scheduleNext();
            }
        };

        update();
        scheduleNext();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <time className={className} dateTime={snapshot?.dateTime} suppressHydrationWarning>
            {snapshot?.label ?? "UTC: --:-- / Seoul: --:--"}
        </time>
    );
}