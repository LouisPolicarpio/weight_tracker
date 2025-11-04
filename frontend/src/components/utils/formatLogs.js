


export function groupLogsByMode(logs  = [], mode = 'day'){
    const grouped = logs.reduce((acc,log) =>{
        const dateObj = new Date(log.created_at);
        let key;

        if (mode === "day"){
          key = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime();
        }else if (mode === "week"){
          const firstDayOfWeek = new Date(dateObj);
          firstDayOfWeek.setDate(dateObj.getDate() - dateObj.getDay() + 1);
          key = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate()).getTime();
        }else if (mode === "month"){
          key = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getTime();     
        }else if (mode === "year"){
          key = new Date(dateObj.getFullYear(), 0, 1).getTime();
        }

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(log.weight)
        return acc;
    },{});

    return Object.entries(grouped).map(([key,weights])=>({
        created_at: Number(key),
        weight: ((weights.reduce((sum,weight)=> sum+weight,0)) / weights.length ).toFixed(2),
    }));
}

export function filterLogs(logs=[],startDate ,endDate){
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;

    return logs.filter(log => {
        const logTime = new Date(log.created_at).getTime();
        return logTime >= start && logTime <= end;
    });
}
