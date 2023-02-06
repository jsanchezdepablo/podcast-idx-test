import moment from "moment/moment";

export const getDateParser = (dateUTZ) => moment(dateUTZ).format("DD/MM/YYYY");
export const getMinutesFromMs = (ms) => moment.duration(ms).asMinutes();
export const getHoursFromMs = (ms) => moment.duration(ms).asHours();
export const getIsSpent24hours = (date) => !date || getHoursFromMs(Date.now() - date) >= 24;
