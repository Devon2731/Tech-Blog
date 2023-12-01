module.exports = {
    format_date: (date) => {
        console.log('Formatting date:', date);
        if (date && date instanceof Date) {
            return date.toLocaleDateString();
        } else {
            return 'N/A';
        }
    },
};
