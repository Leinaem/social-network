/**
 * Compare message date and return time or date
 *
 * @param {String} date
 * @return {String} Time (HH:mm) or date (dd MM yyyy)
 */
export const formatDate = (date) => {
  const dateRef = new Date(date);
  const today = new Date(Date.now());

  const displayTime = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const displayDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(dateRef).toLocaleString(
    "fr-FR",
    dateRef.toDateString() === today.toDateString() ? displayTime : displayDate
  );
};
