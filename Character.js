class Character {
    game                = null
    sprite_multiple     = false;
    sprite_path         = "";
    sprite_paths        = [];
    sprite              = null;
    name                = "";
    x                   = 0;
    y                   = 0;
    width               = 0;
    height              = 0;
    speed               = 0;
    sliceX              = 0;
    sliceY              = 0;
    width               = 0;
    height              = 0;
    anims               = {
        walk: { from: 0, to: 5, loop: true },
        idle: { from: 0, to: 0 },
        jump: { from: 0, to: 0 },
        fall: { from: 0, to: 0 },
        crouch: { from: 0, to: 0 },
        attack: { from: 0, to: 0 },
        hurt: { from: 0, to: 0 },
        die: { from: 0, to: 0 },
    }
    constructor(game,options = {})
    {
        this.game = game
        Object.keys(
            options
        )
        .map(
            key=>{
                this.attr(key,options[key]);
            }
        )
    }
    animation(name,animation)
    {
        this.anims[animation.name] = animation;
    }
    attr(name,value)
    {
        if(name && value)
        {
            this[name] = value;
        }
        return this[name];
    }
    loadsprite()
    {
        if(this.sprite_name)
        {
            if(this.isAnchored())
            {
                this.trash();
            }
            if(this.sprite_path && this.sprite_path != "")
            {
                loadSprite(this.sprite_name,this.sprite_path,{
                    sliceX: this.sliceX, // how many sprites are in the X axis
                    sliceY: this.sliceY, // how many sprites are in the Y axis
                    anims: this.anims,
                    width: this.width,
                    height: this.height
                });
            }
        }
    }
    play(...args)
    {
        if(this.sprite)
        {
            this.sprite.play(...args);
        }
    }
    isAnchored()
    {
        return this.game.getSprite(this.sprite_name) && this.game.getSprite(this.sprite_name).loaded;
    }
    trash()
    {
        if(this.isAnchored())
        {
            this.game.destroy(this.sprite);
        }
    }
    load(loadsprite=false)
    {
        if(loadsprite)
        {
            this.loadsprite()
        }
        this.game.add([sprite(this.sprite_name)]);
    }
}