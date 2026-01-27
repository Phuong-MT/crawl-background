export const resource = [
    "summary_back_to_school.json",
    "summary_end_of_school_year.json",
    "summary_graduation.json",
    "summary_halloween.json",
    "summary_homecoming.json",
    "summary_independence_day.json",
    "summary_labor_day.json",
    "summary_martin_luther_king_jr_day.json",
    "summary_memorial_day.json",
    "summary_new_years_day.json",
    "summary_presidents_day.json",
    "summary_prom.json",
    "summary_spirit_week.json",
    "summary_spring_break_easter.json",
    "summary_summer_break.json",
    "summary_thanksgiving_break.json",
    "summary_valentines_day.json",
    "summary_veterans_day.json",
    "summary_winter_break_christmas_new_year.json",
    "summary_winter_concertplay.json",
];

export const status = ["pass", "faild"];

export function getCategoryFromSource(sourceFile: string) {
    // summary_back_to_school.json -> back_to_school
    return sourceFile.replace("summary_", "").replace(".json", "");
}
