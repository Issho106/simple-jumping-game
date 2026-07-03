class Character {
    constructor(x = 50, y = 0) {
        this.isJumping = false;
        this.position = { x: x, y: y };
        this.velocity = 0;
        this.gravity = -1150;
        this.jumpStrength = 510;
        this.groundLevel = 0;      
        this.characterWidth = 82;
        this.characterHeight = 110;  
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocity = this.jumpStrength;
        }
    }

    getCharacterBounds() {
        return {
            x: this.position.x,
            y: 20 + this.position.y,
            width: this.characterWidth,
            height: this.characterHeight
        };
    }

    update(deltaTime) {
        this._updateCharacterPosition(deltaTime);
        this._applyGravity(deltaTime);
        this._checkFloorCollision();
        this._render();
    }

    _updateCharacterPosition(deltaTime) {
        this.position.y += this.velocity * deltaTime;
    }
    
    _applyGravity(deltaTime) {
        this.velocity += this.gravity * deltaTime;
    }

    _land() {
        this.isJumping = false;
        this.position.y = this.groundLevel;
        this.velocity = 0;
    }
    
    _checkFloorCollision() {
        if (this.position.y <= this.groundLevel) {
            this._land();
        }
    }
    
    _render() {
        const characterElement = document.getElementById('character');
        if(characterElement) {
            characterElement.style.bottom = `${20 + this.position.y}px`;
            characterElement.style.left = `${this.position.x}px`;
        }
    }
}