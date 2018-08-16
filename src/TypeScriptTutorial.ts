class TypeScriptTutorial {

    public constructor() {

        this.showTutorial();
    }

    private showTutorial(): void {

        //this.basicDataTypeTutorial();
        //this.ShowInterfaceTutorial();
        //this.ShowMixInterface();
        //this.ShowMethodThis();
        this.ShowMethodOverride();
    }

    /**
     * 基础数据类型
     */
    private basicDataTypeTutorial(): void {


        // boolean
        var isDone: boolean = false;
        console.log("boolean value:" + isDone);


        // TypeScript中所有的数字都是浮点数
        var decLiteral: number = 6;
        var hexLiteral: number = 0xf00d;        //十六进制
        var binaryLiteral: number = 0b1010;     //二进制
        var octalLiteral: number = 0o744;       //八进制


        // 字符串
        var name: string = "bob";
        var age: number = 37;

        var sentence: string = `Hello, my name is ${name}. I'll be ${age + 1} years old next month.`;
        console.log(sentence);
        sentence = "Hello, my name is " + name + ".\n\n" +
            "I'll be " + (age + 1) + " years old next month.";


        // 数组
        // 数组普通定义
        var list: number[] = [1, 2, 3];
        // 泛型定义
        var list1: Array<number> = [1, 2, 3];


        //元组 Tuple 限定的元组类型允许表示一个已知元素数量和类型的数组，
        //各元素的类型不必相同。限定的前几种类型值必须一一对应
        var tupleExp: [string, number];
        tupleExp = ["hello", 10];
        // 当访问一个越界的元素，会使用联合类型替代
        tupleExp[3] = "world"; //OK, 字符串可以赋值给(string | number)类型


        // 枚举
        enum Color {

            Red = 1,
            Green = 2,
            Blue = 4,
        }

        var colorName: string = Color[2];
        console.log("colorName:" + colorName);
        alert(colorName);


        // Any类型的变量直接通过编译街阶段的编译 运行时检查
        var notSure: any = 4;
        notSure = "maybe a string instead";
        notSure = false;
        // Any类型的基本变量 数组定义 不知是否能当做返回值

        // null undefined是所有类型的子类型 默认--strictNullChecks是关闭的 
        // 开启时null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题
        // 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined

        // never是任何类型的子类型 never表示那些永不存在的值得类型
        // never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
        // 变量也可能是 never类型，当它们被永不为真的类型保护所约束时


        // 类型断言
        let someValue: any = "this is a string";
        var strLength: number = (<string>someValue).length;
        strLength = (someValue as string).length;
    }

    /**
     * 变量声明
     */
    private showVariableDeclarationTutorial() {

        // IIFE立即执行的函数表达式 避免var被重复赋值覆盖
        for (var i = 0; i < 10; i++) {
            // capture the current state of 'i'
            // by invoking a function with its current value
            (function (i) {
                setTimeout(function () { console.log(i); }, 100 * i);
            })(i);
        }

        //var作用域或函数作用域 函数参数也使用函数作用域。
        //var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
        //var在同一作用域里可以多次申明
        var var1;
        //let使用的是词法作用域或块作用域 
        //和常规的高级语言定义的局部变量用法基本一致 作用域方式也是如此
        //let不能申明多次同名变量 用法同打过高级语言定义规则
        let var2;

        // 暂时性死区 方法可以访问后定义的let变量 但是 该方法实际调用时 该变量必须已定义

        //let在一个嵌套作用域里引入一个新名字的行为称做屏蔽
        //这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i
        //var用来定义i却不行 值会出现被覆盖的情况 结果不可预测
        function sumMatrix(matrix: number[][]) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (let i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }

            return sum;
        }

        //var和let的进一步差异化
        //当let声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，
        //而是针对 每次迭代都会创建这样一个新作用域。 这就是我们在使用立即执行的函数表达式时做的事，
        //所以在 setTimeout例子里我们仅使用let声明就可以了
        for (let i = 0; i < 10; i++) {
            setTimeout(function () { console.log(i); }, 100 * i);
        }
    }

    /*
    * 接口
    */
    private ShowInterfaceTutorial() :void {

        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);  
    }

    getCounter(): Counter {
        let counter = <Counter>function (start: number) { return "counter:" + start; };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    private ShowMixInterface() {
        let c = this.getCounter();
        console.log(c(10));
        c.reset();
        c.interval = 5.0;
    }

    private ShowMethodThis(){

        let cardPicker = deck.createCardPicker()();
        egret.log(cardPicker.suit);
    }

    //未加重载签名的重载 不会限定参数签名
    private ShowMethodOverride(){

        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }else{

                return "unknow type";
            }
        }

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        //alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        //alert("card: " + pickedCard2.card + " of " + pickedCard2.suit); 
        
        //alert(pickCard(()=>{ }));

        interface Map<T> {
            [key: string]: T;
        }
        let keys: keyof Map<number>; // string
        
        let tt : Map<number> = { };
        tt['foo'] = 1;
        let value = tt['foo']; // number
        egret.log(value);

    }

    //加重载签名的重载 会限定参数签名
    private ShowMethodOverride1(){

        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: {suit: string; card: number; }[]): number;
        function pickCard(x: number): {suit: string; card: number; };
        function pickCard(x): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

        //error 参数签名不符 重载已经限定了参数签名  
        //alert(pickCard(()=>{ }));
    }
}

interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: any): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this : number) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            egret.log(this.toString());
            egret.log(this);
            //return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            return { suit: "111", card: 1};
        }
    }
}

interface Counter {
    //#函数签名
    (start: number): string; 
    interval: number;
    reset(): void;
} 
       

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { 

         console.log("DigitalClock constructor");
    }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { 

        console.log("AnalogClock constructor");
    }
    tick() {
        console.log("tick tock");
    }
}
