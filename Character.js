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
    speed               = 50;
    sliceX              = 0;
    sliceY              = 0;
    width               = 0;
    height              = 0;
    current_sprite_index= 0;
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
    moveLeft(multiplier=1)
    {
        ninja.walk();
        this.turnLeft()
        this.anchor.x   = (this.anchor.x ?? 0) - this.speed * multiplier
        this.updatePosition()
        ninja.stand();
    }
    updatePosition()
    {   
        this.x          = this.anchor.x
        this.sprite.x   = this.x
        this.y          = this.anchor.y
        this.sprite.y   = this.y

        this.sprite.move(this.anchor.x,this.anchor.y)
    }
    moveRight(multiplier=1)
    {

        ninja.walk();
        this.turnRight()
        this.anchor.x += (this.anchor.x ?? 0) + this.speed * multiplier
        this.updatePosition()
        ninja.stand();
    }
    moveUp(multiplier=1)
    {
        this.turnLeft()
        this.anchor.y -= this.speed * multiplier
        this.updatePosition()
    }
    moveDown(multiplier=1)
    {
        this.turnRight()
        this.anchor.y += this.speed * multiplier
    }
    turnLeft()
    {
        this.getSprite().flipX = true
    }
    turnRight()
    {
        this.getSprite().flipX = false
    }
    spritePath()
    {
        return this.sprite_paths[this.current_sprite_index]
    }
    animation(name,animation)
    {
        this.anims[name] = animation;
    }
    attr(name,value)
    {
        if(name && value)
        {
            this[name] = value;
            if(name == 'sprite_path')
            {
                this.sprite_paths.push(value)
            }
        }
        return this[name];
    }
    switchSprite(options = {})
    {
        Object.keys(
            options
        )
        .map(
            key=>{
                this.attr(key,options[key]);
            }
        )
        this.loadsprite()
    }
    loadsprite()
    {
        if(this.sprite_name)
        {
            if(this.isAnchored())
            {
                this.updatePosition()
                this.getSprite().update()
            }
            else
            {
                if(this.spritePath() && this.spritePath() != "")
                {
                    loadSprite(this.sprite_name,this.spritePath(),{
                        sliceX: this.sliceX, // how many sprites are in the X axis
                        sliceY: this.sliceY, // how many sprites are in the Y axis
                        anims: this.anims,
                        x       : this.x,
                        y       : this.y,
                        speed   : this.speed,
                        width   : this.width,
                        height  : this.height,
                        flipX   : this.flipX,
                        flipY   : this.flipY,
    
                    });
                }
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
            let deleteinfo = this.sprite
            console.info(this.sprite)
            this.game.destroy(this.sprite);
        }
    }
    getSprite()
    {
        return this.sprite
    }
    load(loadsprite=false)
    {
        if(loadsprite)
        {
            this.loadsprite()
        }
        this.sprite = add([sprite(this.sprite_name),pos(this.x,this.y)]);
    }
    walk()
    {
        this.setSpriteIndex(0)
        this.attr('sliceX',8)
        this.attr('sliceY',1)
        this.switchSprite({current_sprite_index:this.current_sprite_index,sliceX:this.attr('sliceX'),sliceY:this.attr('sliceY')})
        this.play("walk")
    }
    stand()
    {
        this.setSpriteIndex(1)
        this.attr('sliceX',6)
        this.attr('sliceY',1)
        this.switchSprite({current_sprite_index:this.current_sprite_index,sliceX:this.attr('sliceX'),sliceY:this.attr('sliceY')})
        this.play("stand")
    }
    setSpriteIndex(index)
    {
        this.current_sprite_index = index
    }
}