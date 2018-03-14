// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,
    properties: {
        speed : 0,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onLoad: function (){
        this.setInputControl();
    },
    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event){
            if (event.keyCode == cc.KEY.left) {
                self.left = true;
            }        
            if (event.keyCode == cc.KEY.right) {
                self.right = true;
            } 
            if (event.keyCode == cc.KEY.up) {
                self.forward = true;
            }     
            if (event.keyCode == cc.KEY.down) {
                self.back = true;
            }     
        });

        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event){
            if (event.keyCode == cc.KEY.left) {
                self.left = false;
            }        
            if (event.keyCode == cc.KEY.right) {
                self.right = false;
            } 
            if (event.keyCode == cc.KEY.up) {
                self.forward = false;
            }     
            if (event.keyCode == cc.KEY.down) {
                self.back = false;
            }     
        });
    },
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度

        var xs = 0;
        var ys = 0;
        if (this.left) {
            xs = xs - this.speed;
        } 
        if (this.right) {
            xs = xs + this.speed;
        }
        if (this.forward) {
            ys = ys + this.speed;
        } 
        if (this.back) {
            ys = ys - this.speed;
        }

        // 根据当前速度更新主角的位置
        this.node.x += xs * dt;
        this.node.y += ys * dt;
    },
});
