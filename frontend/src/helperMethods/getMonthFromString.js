const getMonthFromString = ( month ) => {
    return new Date( Date.parse( month + " 1" ) ).getMonth() + 1;
};

export default getMonthFromString;