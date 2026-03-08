export function dateWithoutTime (date) {
    if(date)
        return date.split('T')[0];
    else
        return date;
}

export function pointNotation (date) {
    if(date) {
        let dateOnly = dateWithoutTime(date);
        let parts = dateOnly.split('-');
        let pointDate = parts[2]+'.'+parts[1]+'.'+parts[0];

        return pointDate;
    }
    else {
        return date;
    }
}