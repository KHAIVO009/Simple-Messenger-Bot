module["exports"]["config"] = {
    name: "ttdl",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "joshuapinakapogisalahat#06walangtitibagikawlangsapatna",
    description: "Download tiktok using link (no watermark)",
  commandCategory: "utilities",
  usages: "[tiktok link]",
  cooldowns: 0
};
module["exports"]["run"] = async function ({api,event,args})  {
const axios = require("axios"),
fs = require("fs");
try {
  let text = args.join(" ");
  if (!text){
     return api.sendMessage("Wrong format\nUse "+global.config.PREFIX+this.config.name+" "+this.config.usages, event.threadID, event.messageID)
   } else {
    return api.sendMessage("Downloading....", event.threadID, event.messageID)
}
  const res = await axios.get("https://nguyenmanh.name.vn/api/autolink?url="+text+"&apikey=pNKvedtJ")
  let tiitok1 = res.result.video.nowatermark;
 let path = __dirname+`/cache/tt.mp4`;
 let tiktok = (await axios.get(tiktok1,{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(path, Buffer.from(tiktok, "utf-8"));
return api.sendMessage({attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path),event.messageID);
  }catch (err) {
      return api.sendMessage(err,event.threadID,event.messageID)
 }
}