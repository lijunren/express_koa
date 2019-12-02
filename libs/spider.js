const urllib = require("url");
const http = require("http");
const https = require("https");

function requestUrl(url, headers={}) {
    const urlObj = urllib.parse(url);
    let httpMode = "";
    if (urlObj.protocol == "http:") {
        httpMode = http;
    } else if (urlObj.protocol == "https:"){
        httpMode = https;
    } else {
        throw new Error("无法识别的"+urlObj.protocol);
    }
    return new Promise((resolve, reject) => {
        const req = httpMode.request({
            host: urlObj.host,
            path: urlObj.path,
            headers,
        }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode==304) {
                const arr = [];
                res.on("data", data => {
                    arr.push(data);
                });
                res.on("end", () => {
                    const data = Buffer.concat(arr);
                    // console.log(data);
                    resolve({
                        code: 200,
                        body: data,
                        headers: res.headers
                    });
                });
            }  else if (res.statusCode == 301 || res.statusCode == 302) {
                console.log(res.headers);
                resolve({
                    code: res.statusCode,
                    body: null,
                    headers: res.headers
                });
            } else {
                reject({
                    code: res.statusCode,
                    body: null,
                    headers: res.headers
                });
            }
        });
        req.on("error", err => {
            console.log("error:", err);
        });

        req.write(""); // 发送POST数据

        req.end();  // 正式开始服务
    });
}

module.exports = async (url,reqHeader) => {
    try {
        const {code, body, headers} = await requestUrl(url,reqHeader);
        // console.log(code, body, headers,"成功");
        if (code === 200) {
            return {body,headers}
        } else if (code === 301 || code === 302) {
            request(headers.location);
        }
    } catch(e) {
        console.log("失败", e);
    }
};




