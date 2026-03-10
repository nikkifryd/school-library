export function dateWithoutTime (date) {
    if(date)
        return date.split('T')[0];
    else
        return date;
}

export function pointNotation (date) {
    if(date) {
        if(date instanceof Date) {
            let initMonth = date.getMonth();
            let correctMonth = (initMonth<10)?'0'+initMonth:initMonth;
            
            let dateString = date.getDate()+'.'+correctMonth+'.'+date.getFullYear();
            
            return dateString;
        }
        else if (typeof date === 'string') {
            let dateOnly = dateWithoutTime(date);
            let parts = dateOnly.split('-');
            let pointDate = parts[2]+'.'+parts[1]+'.'+parts[0];

            return pointDate;
        }
    }
    else {
        return null;
    }
}