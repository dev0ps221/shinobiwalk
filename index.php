<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KAPLAY</title>
</head>
<body>
    <div id="game">
    </div>
    <script src='kaplay.js'></script>
    <script src='Character.js'></script>
    <script src='Shinobi.js'></script>
    <script>
        
        
        k = kaplay();

        ninja = new Shinobi(k,{
            sprite_name: "ninja",
            sprite_paths: ["assets/Shinobi/walk.png","assets/Shinobi/idle.png"],
            sliceX: 8, // how many sprites are in the X axis
            sliceY: 1, // how many sprites are in the Y axis
            anims: {
                walk: { from: 0, to: 7, loop: true },
                stand: { from: 0, to: 5, loop: true },
            },
            width: 50,
            speed : 12,
            height: 50,
            anchor: { x: 0.5, y: 0.5 }
        })
        ninja.setSpriteIndex(1)
        ninja.switchSprite({current_sprite_index:1,sliceX:6})
        ninja.load(true)
        ninja.play("stand");
        onKeyPress((key)=>{
            
            if(key == "right")
            {
                ninja.walk();
                ninja.moveRight();
                ninja.stand();
            }
            if(key == "left")
            {
                ninja.walk();
                ninja.moveLeft();
                ninja.stand();
            }
            if(key == "up")
            {
                ninja.play("walk");
                ninja.moveUp();
                ninja.play("stand");
            }
            if(key == "down")
            {
                ninja.play("walk");
                ninja.moveDown();  
                ninja.play("stand"); 
            }
        })
        on
    </script>
</body>
</html>