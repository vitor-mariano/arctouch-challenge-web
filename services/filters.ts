import moment from 'moment';

export const formatDate = date => moment(date).format('MMMM D, YYYY');
