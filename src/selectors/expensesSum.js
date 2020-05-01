
export default (expenses) => {
    if(expenses.length === 0) {
        return 0;
    } else {
        const total = expenses.reduce(
            function(sum, value) {
                return sum + parseInt(value.amount)
            }, 0
        );
        return total;
    }
}