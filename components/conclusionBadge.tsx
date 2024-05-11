import React from "react";
import { Badge } from "@/components/ui/badge";

function calculateColor(conclusion: string) {
    switch (conclusion) {
        case "success":
            return "bg-green-400";
        case "failure":
            return "bg-red-400";
        case "pending":
            return "bg-amber-400";
        case "cancelled":
            return "bg-gray-400";
        default:
            return "bg-gray-400";
    }
}

export function ConclusionBadge({ conclusion }: { conclusion: string }) {
    const color = calculateColor(conclusion);
    return (
        <Badge className={`text-xs ${color}`} variant="secondary">
            {conclusion}
        </Badge>
    );
}
