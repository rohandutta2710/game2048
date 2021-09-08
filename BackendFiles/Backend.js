const fs = require("fs");
const os = require("os");
const fileName = "storing.txt";
var data;
var userinformation = os.userInfo();
var hostName = os.hostname();
var IPaddress = os.networkInterfaces();

//Used to get the bestScore depending upon the IPAddress
//it will be called only once when the page will be loaded
function InitialData() {
    data = { HostName: hostName, IPAddress: IPaddress["Wi-Fi"][0]["address"], UserName: userinformation.username, BestScore: 0 };
    let fileData = SendingData();
    for (let i of fileData) {
        if (i.IPAddress === data.IPAddress) {
            console.log(i.BestScore);
            return i.BestScore;
        }
    }
    //New user, playing my game first time
    fs.appendFileSync(fileName, "\n" + JSON.stringify(data) + ",");
    return 0;
}


//Storing data if HighScore is broken
async function StoreData(bestsc){
    let virtualData = SendingData();
    for (let i of virtualData) {
        if (i.IPAddress === data.IPAddress) {
            i.BestScore = bestsc;
            break;
        }
    }
    virtualData = JSON.stringify(virtualData);
    virtualData = virtualData.substring(1, virtualData.length - 1);
    virtualData = virtualData.concat(",");
    fs.writeFileSync(fileName, virtualData);
}

//getting all the data present in the json format of storing.txt file.
function SendingData() {
    let d = fs.readFileSync(fileName, "utf-8");
    d = d.substring(0, d.length - 1)
    d = JSON.parse("[".concat(d, "]"));
    return d;
}
// InitialData();
module.exports.StoreDataFunc = StoreData;
module.exports.InitialDataFunc = InitialData;