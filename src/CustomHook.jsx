var array;
var sc;
function settingArr(score,arr){
    sc=score;
    [...array]=arr;
    return;
}

function returnArr(){
    return [sc,array];
}

export default settingArr;
export {returnArr};