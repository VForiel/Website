/**
 * Partial date utilities.
 *
 * Frontmatter dates may be:
 *   - "2025-12-01"  → full date   → displayed as "1 décembre 2025"
 *   - "2025-12"     → month+year  → displayed as "décembre 2025"
 *   - "2025"        → year only   → displayed as "2025"
 *
 * For sorting / timeline logic, missing parts default to the 1st
 * (1st day of month, January for missing month).
 */

export interface ParsedDate {
    /** Full JS Date (with defaults for missing parts, for sorting). */
    date: Date;
    /** Whether the day was explicitly provided. */
    hasDay: boolean;
    /** Whether the month was explicitly provided. */
    hasMonth: boolean;
}

/**
 * Parse a partial date string into a ParsedDate.
 * Accepts: "YYYY", "YYYY-MM", "YYYY-MM-DD", or a full Date object
 * (which Zod/YAML may still produce for existing "2025-12-01" values).
 */
export function parsePartialDate(
    value: string | Date | undefined,
): ParsedDate | null {
    if (value == null) return null;

    // If it's already a Date object (backward compat with z.date()),
    // treat it as a full date.
    if (value instanceof Date) {
        return { date: value, hasDay: true, hasMonth: true };
    }

    const str = String(value).trim();
    if (!str) return null;

    const parts = str.split("-");
    const year = parseInt(parts[0], 10);
    const month = parts.length >= 2 ? parseInt(parts[1], 10) : 1;
    const day = parts.length >= 3 ? parseInt(parts[2], 10) : 1;

    return {
        date: new Date(year, month - 1, day),
        hasDay: parts.length >= 3,
        hasMonth: parts.length >= 2,
    };
}

/**
 * Format a ParsedDate for display.
 * - Full date  → "1 décembre 2025"
 * - Month+year → "décembre 2025"
 * - Year only  → "2025"
 */
export function formatPartialDate(
    parsed: ParsedDate | null,
    lang: "fr" | "en",
    fallback?: string,
): string {
    if (!parsed) {
        return fallback ?? (lang === "fr" ? "En cours" : "Ongoing");
    }

    const locale = lang === "fr" ? "fr-FR" : "en-US";

    if (!parsed.hasMonth) {
        // Year only
        return parsed.date.getFullYear().toString();
    }

    if (!parsed.hasDay) {
        // Month + year
        return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
        }).format(parsed.date);
    }

    // Full date
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsed.date);
}

/**
 * Build a display label from start and end partial dates.
 */
export function buildDateLabel(
    startRaw: string | Date | undefined,
    endRaw: string | Date | undefined,
    lang: "fr" | "en",
): string {
    const start = parsePartialDate(startRaw);
    const end = parsePartialDate(endRaw);

    const ongoingLabel = lang === "fr" ? "En cours" : "Ongoing";
    const formattedStart = start ? formatPartialDate(start, lang) : null;
    const formattedEnd = end
        ? formatPartialDate(end, lang)
        : ongoingLabel;

    return formattedStart
        ? `${formattedStart} — ${formattedEnd}`
        : formattedEnd;
}

/**
 * Get a numeric timestamp from a partial date string (for sorting).
 * Returns Infinity if the date is undefined (ongoing projects sort first).
 */
export function dateToTimestamp(
    value: string | Date | undefined,
): number {
    const parsed = parsePartialDate(value);
    return parsed ? parsed.date.valueOf() : Infinity;
}
