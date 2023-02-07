import moment from "moment/moment";

export const getDateParser = (dateUTZ) => moment(dateUTZ).format("DD/MM/YYYY");
export const getMinutesParserFromMs = (ms) => moment.utc(ms).format("HH:mm:ss");
export const getHoursFromMs = (ms) => moment.duration(ms).asHours();
export const getIsSpent24hours = (date) => !date || getHoursFromMs(Date.now() - date) >= 24;
