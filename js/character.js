class Character {
    constructor(imageSource, imageAlternate) {
        this.isJumping = false;
        this.position = { x: 50, y: 0 };
        this.velocity = 0;
        this.groundLevel = 0;      
        this.characterWidth = 82;
        this.characterHeight = 110;
        this.imageSource = imageSource;
        this.imageAlternate = imageAlternate;
        this._updateCharacterVariation();
    }

    getGravity() { return -1150; }
    getJumpStrength() { return 510; }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocity = this.getJumpStrength();
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
        this.velocity += this.getGravity() * deltaTime;
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

    _updateCharacterVariation() {
        const characterContainer = document.getElementById('character');
        if(!characterContainer) { return; }

        let characterImage = characterContainer.querySelector('img');
        if(!characterImage) {
            characterImage = document.createElement('img')
            characterContainer.appendChild(characterImage);
        }

        characterImage.src = this.imageSource;
        characterImage.alt = this.imageAlternate;
    }
}

class SilverKnight extends Character {
    constructor() {
        super('./assets/images/silver-knight.png', 'Silver Knight');
    }
}

class GoldenKnight extends Character {
    constructor() {
        super('./assets/images/golden-knight.png', 'Golden Knight')
    }
    
    getGravity() { return -1850; }
    getJumpStrength() { return 770; }
}