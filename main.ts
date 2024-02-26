scene.onHitWall(SpriteKind.Player, function (sprite, location) {
	
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    JumpsLeft()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    PLayerSprite.setVelocity(-50, 0)
})
function AnimatePlayer () {
    characterAnimations.loopFrames(
    PLayerSprite,
    assets.animation`PlayerWalkLeft`,
    500,
    characterAnimations.rule(Predicate.MovingLeft)
    )
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    PLayerSprite.setVelocity(50, 0)
})
function JumpsLeft () {
    if (Jump_Ability <= 2) {
        PLayerSprite.y += -40
        Jump_Ability += Jump_Ability + 1
    }
}
function Place_platform (row: number, column: number) {
    for (let index1 = 0; index1 <= row; index1++) {
        for (let index2 = 0; index2 <= column; index2++) {
            if (Math.percentChance(4)) {
                if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(index2, index1), sprites.castle.tileGrass2))) {
                    tiles.setTileAt(tiles.getTileLocation(index2, index1), assets.tile`StaticTile`)
                    tiles.setWallAt(tiles.getTileLocation(index2, index1), true)
                } else if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(index2, index1), sprites.castle.tileGrass2))) {
                    tiles.setTileAt(tiles.getTileLocation(index2, index1), assets.tile`BouncePad`)
                    tiles.setWallAt(tiles.getTileLocation(index2, index1), true)
                } else {
                	
                }
            }
        }
    }
}
let Jump_Ability = 0
let PLayerSprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
PLayerSprite = sprites.create(assets.image`playerAsset`, SpriteKind.Player)
PLayerSprite.ay = 200
PLayerSprite.setStayInScreen(true)
PLayerSprite.setPosition(4, 45)
scene.cameraFollowSprite(PLayerSprite)
Jump_Ability = 0
Place_platform(48, 16)
forever(function () {
    if (PLayerSprite.isHittingTile(CollisionDirection.Bottom)) {
        Jump_Ability = 2
    }
})
