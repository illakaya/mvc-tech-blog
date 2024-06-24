// taken from 14-MVC 19-Ins_Middleware

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${
      new Date(date).getFullYear()
    }`;
  },
};