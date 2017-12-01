cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
        _moveDirect: [],
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;


        // this._moveDirect = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find("Canvas").on('mousemove', this.mouseOver, this);

        var velocity = this.node.getComponent('cc.RigidBody').linearVelocity;
        cc.log(this.node)
        this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(200, 0)

    },
    onKeyDown: function (event) {
        let self = this;
        switch (event.keyCode) {
            case cc.KEY.w:
                if (self.isInArray('up')) {
                    this._moveDirect.push('up');
                }
                break;
            case cc.KEY.a:
                if (self.isInArray('left')) {
                    this._moveDirect.push('left');
                }
                break;
            case cc.KEY.s:
                if (self.isInArray('down')) {
                    this._moveDirect.push('down');
                }
                break;
            case cc.KEY.d:
                if (self.isInArray('right')) {
                    this._moveDirect.push('right');
                }
                break;
        }

        // cc.log(this._moveDirect)
    },

    onKeyUp: function (event) {
        cc.log(event.keyCode);
        let self = this;
        switch (event.keyCode) {
            case cc.KEY.w:
                self.removeFormArray(this._moveDirect, 'up')
                break;
            case cc.KEY.a:
                self.removeFormArray(this._moveDirect, 'left')
                break;
            case cc.KEY.s:
                self.removeFormArray(this._moveDirect, 'down')
                break;
            case cc.KEY.d:
                self.removeFormArray(this._moveDirect, 'right')
                break;
        }

        // cc.log(this._moveDirect)
    },
    mouseOver: function (e) {
        let x1 = cc.find('Canvas').width / 2;
        let y1 = cc.find("Canvas").height / 2;
        let x2 = e.getLocationX();
        let y2 = e.getLocationY();

        // 获取角度
        var x = Math.abs(x1 - x2);
        var y = Math.abs(y1 - y2);
        var z = Math.sqrt(x * x + y * y);
        var rotat = Math.round((Math.asin(y / z) / Math.PI * 180));

        // 第一象限
        if (x2 >= x1 && y2 <= y1) {
            rotat = rotat;
        }
        // 第二象限
        else if (x2 <= x1 && y2 <= y1) {
            rotat = 180 - rotat;
        }
        // 第三象限
        else if (x2 <= x1 && y2 >= y1) {
            rotat = 180 + rotat;
        }
        // 第四象限
        else if (x2 >= x1 && y2 >= y1) {
            rotat = 360 - rotat;
        }
        this.node.rotation = rotat - 90;
        return rotat; //真实的角度
    },
    isInArray: function (val) {
        let arr = this._moveDirect;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return false;
            };
        }
        return true;
    },
    removeFormArray: function (arr, val) {
        arr = this._moveDirect;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
            };
        }
        return arr;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        let self = this;
        if (self._moveDirect.length > 0) {
            for(i;i<self._moveDirect.length;i++) {
                switch (self._moveDirect[i]) {
                    case 'up':
                        // self.node.setPosition( self.node.x, self.node.y * dt + 1 )
                        // self.node.y += this.speed * dt;
                        this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(0, this.speed);
                        break;
                    case 'left':
                        // self.node.x -= this.speed * dt;
                        this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(-this.speed,0);
                        break;
                    case 'down':
                        // self.node.y -= this.speed * dt;
                        this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(0,-this.speed);
                        break;
                    case 'right':
                        // self.node.x += this.speed * dt;
                        this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(this.speed, 0);
                        break;
                }
            }
        } else {
            this.node.getComponent('cc.RigidBody').linearVelocity = cc.v2(0, 0);
        }
    },
});
