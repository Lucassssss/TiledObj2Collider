cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        var tiledMap = cc.find("Canvas/map/tiled").getComponent("cc.TiledMap");
        var wallObject = tiledMap.getObjectGroup("collider");
        var objects = wallObject.getObjects();
        for(var i=0; i<objects.length; i++) {
            var dict = objects[i].getProperties();
            var newCollider = cc.find("Canvas/collider").addComponent('cc.PhysicsPolygonCollider')
            // Convert tiled points to ccv2
            var ccv2Points = [];
            for(var j=0; j<dict.points.length; j++) {
                ccv2Points.push( cc.v2(dict.points[j].x, -dict.points[j].y));
            }
            newCollider.points = ccv2Points;
            newCollider.offset = cc.v2(objects[i].offset.x, -objects[i].offset.y);
            newCollider._name = 'formTield';
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
