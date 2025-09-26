export const timeConversion = (isoString: string): string => {
  try {
    const d = new Date(isoString);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 → 12
    const hourStr = String(hours).padStart(2, '0');

    return `${year}-${month}-${day} ${hourStr}:${minutes} ${ampm}`;
  } catch (error) {
    return isoString;
  }
};
