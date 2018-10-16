Editor.Panel.extend({
    style: `
        :host {
            padding: 4px;
            display: flex;
            flex-direction: column;
        }
        .box{
            display: flex;
        }
        .box .index{
            width:30px;
            text-align: center;
        }
        .box .name{
            flex: 2;
        }
        .box .layer{
            flex: 1;
        }
    `,
    template: `
        <ui-box-container>
            <div class="box" v-for="(index,item) in layerList">
                <span class="index">{{index+1}}</span>
                <input class="name" v-model="item[0]"></input>
                <input class="layer" v-model="item[1]"></input>
                <ui-button class="tiny red" @click="del(index)">删除</ui-button>
            </div>
        </ui-box-container>
        <div style="margin-top: 4px;">
            <ui-button class="cbtn green" @click="save">保存</ui-button>
            <ui-button class="cbtn" @click="add">添加</ui-button>
            <ui-button class="cbtn" @click="sort">排序</ui-button>
        </div>
    `,

    ready() {

        const fs = require('fs');
        const path = require('path');
        const resFile = path.resolve(Editor.projectInfo.path, './assets/lib/layer-manager.js');
        const dtsFile = path.resolve(Editor.projectInfo.path, './typings/layer-manager.d.ts');
        const templateFile = path.resolve(Editor.projectInfo.path, './packages/layer-manager/template.js');
        const templateTxt = fs.readFileSync(templateFile, 'utf-8').toString();

        new window.Vue({
            el: this.shadowRoot,
            data: {
                layerList: [],
            },
            created() {
                this.init();
            },
            methods: {
                init() {
                    if (fs.existsSync(resFile)) {
                        this.layerList = require(resFile);
                    }
                },
                add() {
                    this.layerList.push(['测试', 0]);
                },
                sort(){
                    this.layerList.sort(function(a,b){
                        return a[1] > b[1] ? 1 : -1;
                    });
                },
                del(index){
                    this.layerList.splice(index, 1);
                },
                save() {
                    //js文件
                    let str = '[\n\t';
                    let arr = [];
                    for (let item of this.layerList) {
                        arr.push(`["${item[0]}", ${item[1]}]`);
                    }
                    str += arr.join(',\n\t');
                    str += '\n]';
                    const txt = templateTxt.replace(`'##LayerDataHoldPlace##'`, str);
                    fs.writeFileSync(resFile, txt);
                    //d.ts文件
                    let dts = 'declare module cs.Layer {\n';
                    for(let item of this.layerList){
                        dts += `\texport var ${item[0]}: number\n`;
                    }
                    dts += '}\n';
                    fs.writeFileSync(dtsFile, dts);
                    alert('成功');
                }
            }
        });
    },
});