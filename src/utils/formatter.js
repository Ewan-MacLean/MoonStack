function parseDateString(dateString) {
    // Regular expression to match ISO 8601 format
    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/;

    // Test if the string matches the regex pattern
    if (!isoRegex.test(dateString)) {
        throw new Error("Invalid date format. Expected YYYY-MM-DDTHH:mm:ssZ");
    }

    // Manual parsing of the string components
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    const hours = dateString.slice(11, 13);
    const minutes = dateString.slice(14, 16);
    const seconds = dateString.slice(17, 19);

    // Month name mapping
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: parseInt(day, 10),
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
        seconds: parseInt(seconds, 10),

        // Formatted representations
        monthName: monthNames[parseInt(month, 10) - 1],
        monthYear: `${monthNames[parseInt(month, 10) - 1]} ${year}`,

        // Padded versions
        paddedMonth: month,
        paddedDay: day,

        // Formatted date string
        formattedDate: `${year}-${month}-${day}`,
    };
}

const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export default parseDateString;
