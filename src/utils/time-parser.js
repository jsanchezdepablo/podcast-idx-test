import moment from "moment/moment";

export const getDateParser = (dateUTZ) => moment(dateUTZ).format("DD/MM/YYYY");

export const getMinutes = (ms) => moment.duration(ms).asMinutes();
