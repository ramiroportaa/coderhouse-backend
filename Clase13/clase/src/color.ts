const generateRandom = ():number => {
    return Math.floor(Math.random() * 255);
}

class Color {
    rgb:string;
    constructor(){
        this.rgb = `${generateRandom()}, ${generateRandom()}, ${generateRandom()}`;
    }
}

const color1:Color = new Color();
const color2:Color = new Color();

console.log(color1, color2);