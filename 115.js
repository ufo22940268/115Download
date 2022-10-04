// ==UserScript==
// @name      115 download
// @match     https://mini4k.com/torrents/*
// @match     https://www.mini4k.com/torrents/*
// @version     1.0
// @require     http://apps.bdimg.com/libs/jquery/1.11.3/jquery.js
// @grant       GM_xmlhttpRequest
// @grant       GM_notification
// @connect     115.com
// ==/UserScript==

const downloadAnchorSelector = 'a[href^="magnet"]'

$(downloadAnchorSelector).attr("target", "blank");
$(downloadAnchorSelector).each(function () {
    var url = $(this).attr("href");
    url = "http://115.com/web/lixian/?ct=lixian&ac=add_task_url&url=" + url;
    $(this).on("click", function () {
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            responseType: "json",
            onload: function (data) {
                if (data.response.errcode > 0) {
                    GM_notification({
                        text: data.response.error_msg,
                        title: "离线失败！",
                        timeout: 3500
                    });
                } else {
                    GM_notification({
                        text: "离线成功！",
                        title: "离线成功！",
                        timeout: 1500
                    });
                }
            }
        });
        return false;
    });
});
