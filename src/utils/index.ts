export const timeConversion = (isoString: any): string => {
  try {
    // Ensure isoString is a string
    const dateStr = typeof isoString === "string" ? isoString : String(isoString);

    const d = new Date(dateStr);

    if (isNaN(d.getTime())) {
      // Invalid date
      console.error("Invalid date:", isoString);
      return String(isoString);
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const hourStr = String(hours).padStart(2, "0");

    return `${year}-${month}-${day} ${hourStr}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error in timeConversion:", error);
    return String(isoString);
  }
};
