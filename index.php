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
    <script>
        
        
        k = kaplay();

        ninjawalk = new Character(k,{
            sprite_name: "ninjawalk",
            sprite_path: "assets/Shinobi/walk.png",
            sliceX: 8, // how many sprites are in the X axis
            sliceY: 1, // how many sprites are in the Y axis
            anims: {
                walk: { from: 0, to: 7, loop: true },
            },
            width: 10,
            height: 10,
            anchor: { x: 0.5, y: 0.5 }
        })
        ninja = new Character(k,{
            sprite_name: "ninja",
            sprite_path: "assets/Shinobi/idle.png",
            sliceX: 6, // how many sprites are in the X axis
            sliceY: 1, // how many sprites are in the Y axis
            anims: {
                stand: { from: 0, to: 5, loop: true },
            },
            width: 10,
            height: 10,
            anchor: { x: 0.5, y: 0.5 }
        });

        ninja.load(true)
        ninja.play("stand");
        ninjawalk.load(true)
        ninjawalk.play("walk");
    </script>
</body>
</html>