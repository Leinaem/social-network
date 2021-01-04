/**
 * Compare message date and return time or date
 *
 * @param {String} date
 * @return {String} Time (HH:mm) or date and time  (dd/MM/yyyy à HH:mm)
 */
export const formatDate = (date) => {
  const dateRef = new Date(date);
  const today = new Date(Date.now());

  const displayTime = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const displayDateTime = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(dateRef).toLocaleString(
    "fr-FR",
    dateRef.toDateString() === today.toDateString()
      ? displayTime
      : displayDateTime
  );
};
