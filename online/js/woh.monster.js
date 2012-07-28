/**
 * ÈËÎï»òÕß¹ÖÎï 
 */


Laro.NS('woh', function (L) {
    var Monster = woh.Sprite.extend(function () {
        this.speed = 100;
        this.enemy = "role";
        this.damage=this.data['damage'];
    }).methods({
        getAnimationGroup: function (type) {
            L.$lea.setLoader(woh.loader);

            var obj = this.data[type];
            ret = [];
            if (!Array.isArray(obj)) {
                obj = [obj];
            }
            L.$lea.setSourceObj(obj);
            for (var i = 0; i < obj.length; i++) {
                ret.push(L.$lea.getAnimation(i));
            }

            return ret;
        },
        draw: function (render) {
            var x = Math.floor(this.x), y = Math.floor(this.y),
                me = this;
            render.context.drawImage(woh.loader.loadedImages['images/shadow.png'], this.x - 60, this.y+me.height/2-40);
            this.curAnimation && this.curAnimation.forEach(function (o) {
                ((me.face == 'left' && !o.renderMirrored) || (me.face == 'right' && o.renderMirrored)) && o.mirror();
                o.draw(render, x, y, 0, 1, null);
            });
            /***debug***/
            render.context.fillStyle = "blue";
            render.context.fillRect(this.x - 2, this.y - 2, 4, 4);
            render.context.strokeStyle = "green";
            render.context.strokeRect(this.left, this.top, this.width, this.height);
            render.context.strokeStyle = "red";
            render.context.strokeRect(this.damageArea.left, this.damageArea.top, this.damageArea.right - this.damageArea.left, this.damageArea.bottom - this.damageArea.top)
            /***********/
            this.drawHPBar(render); //绘制血条
        },
        setPos: function(x, y) {
            this.x = x;
            this.y = y;
            this.checkRect.setPos(x, y);
            this.brain.knowPos(this,x,y);
            if(this.stage)
                this.stage.registerHurtableObject("monster", this,{left:this.left,right:this.right,top:this.top,bottom:this.bottom});
        },
        normalAttack: function () {
            this.fsm.setState(woh.roleStates.attack);
        }
    });
    this.Monster = Monster;
});