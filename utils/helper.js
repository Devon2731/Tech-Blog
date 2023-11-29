// utils/helper.js

module.exports = {
    format_date: (date) => {
        // Check if date is defined and is a valid Date object
        if (date && date instanceof Date) {
            // Format date as MM/DD/YYYY
            return date.toLocaleDateString();
        } else {
            // Handle the case where date is undefined or not a valid Date object
            return 'N/A'; // Or any other default value or message
        }
    },
};

