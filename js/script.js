/**
 * Initial JS file to test extension features.
 */
"use strict";
class CSSReg {
    constructor() {
        this.FROM = "CSS_REG_WEB_PAGE";
        this.TYPE_HAND_SHAKE = "HAND_SHAKE";
        this.TYPE_MOCK_DATA = "MOCK_DATA";
        this.TYPE_CAPTURE_SCREEN_SHOTS = "CAPTURE_SCREEN_SHOTS";
    }

    /**
     * Method to send data to extensioin.
     * @param dataStr {String}
     */
    sendMsg(dataStr) {
        window.postMessage(dataStr, '*');
    }

    registerListener() {
        window.addEventListener("message", (event) => {
            this.processData(event)
        }, false);
    }

    processData(event) {
        var data;
        try {
            data = JSON.parse(event.data);
            if (data.from === "CSS_REG_EXT") {
                console.log("FROM PAGE");
                console.log(data);
                switch (data.type) {
                    case this.TYPE_HAND_SHAKE:
                        this.addMockData();
                        break;
                    case this.TYPE_MOCK_DATA:
                        this.renderUI(data);
                        break;
                    default:
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    getInformation() {

    }

    renderUI(data) {
        var msg = data.msg;
        var html = [];
        html.push('<table border="1" style="border: 1px solid;border-collapse:collapse">');
        html.push('<tr>');
        html.push('<td>Project Name</td>');
        html.push('<td>' + msg.project_name + '</td>');
        html.push('</tr>');
        html.push('<tr>');
        html.push('<td>Site Name</td>');
        html.push('<td>' + msg.name + '</td>');
        html.push('</tr>');
        html.push('<tr>');
        html.push('<td>Urls</td>');
        html.push('<td>');
        html.push('<ol>');
        msg.urls.forEach((url) => {
            html.push('<li>' + url + '</li>');
        });
        html.push('</ol>');
        html.push('</td>');
        html.push('</tr>');
        html.push('<tr><td colspan="2"><button id="run">Run Regression</button></td></tr>')
        html.push('</table>');
        jQuery('#root').html(html.join(''));
        jQuery('#run').on("click", () => {
            this.runRegression(msg)
        });
    }

    runRegression(msg) {
        console.log("Run Regression data = " + JSON.stringify(msg));
    }

    addMockData() {
        const mockData = {
            'from': this.FROM,
            'type': this.TYPE_MOCK_DATA,
            'msg': "CHECK_AND_CREATE_MOCK_DATA"
        };
        this.sendMsg(JSON.stringify(mockData));
    }

    init() {
        this.registerListener();
        const handShake = {
            'from': this.FROM,
            'type': this.TYPE_HAND_SHAKE,
            'msg': 'ARE_YOU_THR'
        };
        this.sendMsg(JSON.stringify(handShake));
    }
}
$(function () {
    const cssReg = new CSSReg();
    cssReg.init();
});


