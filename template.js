/**
 * 程序自动生成，切勿手动修改
 */

(function () {

var Data = '##LayerDataHoldPlace##';

var Map = {};
for(var i=0; i<Data.length; i++){
    Map[Data[i][0]] = Data[i][1];
}

window['cs'] = window['cs'] || {};
window['cs']['Layer'] = Map;
if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = Data;
}

})();