
export function toBanglaDigits(str: string | number): string {
    const english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bangla = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    let result = String(str);
    for (let i = 0; i < 10; i++) {
        result = result.replaceAll(english[i], bangla[i]);
    }
    return result;
}

export function localizeTime(timeStr: string): string {
    // Converts "3 hours ago" -> "৩ ঘণ্টা আগে"
    // Converts "30 mins ago" -> "৩০ মিনিট আগে"
    let localized = timeStr
        .replace("hours ago", "ঘণ্টা আগে")
        .replace("hour ago", "ঘণ্টা আগে")
        .replace("mins ago", "মিনিট আগে")
        .replace("min ago", "মিনিট আগে")
        .replace("days ago", "দিন আগে")
        .replace("day ago", "দিন আগে")
        .replace("Just now", "মাত্র");

    return toBanglaDigits(localized);
}
