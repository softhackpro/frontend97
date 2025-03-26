function findCommonPrefix(names) {
    if (names.length === 0) return "";
    
    let prefix = names[0]; // Start with the first name

    for (let i = 1; i < names.length; i++) {
        while (names[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1); // Remove last character until a match is found
            if (!prefix) return "";
        }
    }
    return prefix.trim(); // Remove any trailing spaces
}

export const transformDataTeenPatti = (data) => {
    const result = {};

    data.forEach(item => {
        const { subtype, nat, min, max, gstatus, ...playerInfo } = item; 
        
        if (!result[subtype]) {
            result[subtype] = {
                subtype,
                min,
                max,
                playersInfo: [],
                suspendedAll: true // Default to true, will change if any match is open
            };
        }

        result[subtype].playersInfo.push({ nat, ...playerInfo });

        // If any match is not suspended, set suspendedAll to false
        if (gstatus !== "SUSPENDED") {
            result[subtype].suspendedAll = false;
        }
    });

    Object.keys(result).forEach(subtype => {
        const names = result[subtype].playersInfo.map(player => player.nat);
        const commonPrefix = findCommonPrefix(names) || "";
        const uncommonParts = names.map(name => name.replace(commonPrefix, "").trim()).join(" & ");

        result[subtype].name = uncommonParts ? `${commonPrefix} (${uncommonParts})` : subtype;
    });

    return Object.values(result);
};
