var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeScriptTutorial = (function () {
    function TypeScriptTutorial() {
        this.showTutorial();
    }
    TypeScriptTutorial.prototype.showTutorial = function () {
        this.basicDataTypeTutorial();
        this.ShowInterfaceTutorial();
        this.ShowMixInterface();
    };
    /**
     * 基础数据类型
     */
    TypeScriptTutorial.prototype.basicDataTypeTutorial = function () {
        // boolean
        var isDone = false;
        console.log("boolean value:" + isDone);
        // TypeScript中所有的数字都是浮点数
        var decLiteral = 6;
        var hexLiteral = 0xf00d; //十六进制
        var binaryLiteral = 10; //二进制
        var octalLiteral = 484; //八进制
        // 字符串
        var name = "bob";
        var age = 37;
        var sentence = "Hello, my name is " + name + ". I'll be " + (age + 1) + " years old next month.";
        console.log(sentence);
        sentence = "Hello, my name is " + name + ".\n\n" +
            "I'll be " + (age + 1) + " years old next month.";
        // 数组
        // 数组普通定义
        var list = [1, 2, 3];
        // 泛型定义
        var list1 = [1, 2, 3];
        //元组 Tuple 限定的元组类型允许表示一个已知元素数量和类型的数组，
        //各元素的类型不必相同。限定的前几种类型值必须一一对应
        var tupleExp;
        tupleExp = ["hello", 10];
        // 当访问一个越界的元素，会使用联合类型替代
        tupleExp[3] = "world"; //OK, 字符串可以赋值给(string | number)类型
        // 枚举
        var Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 2] = "Green";
            Color[Color["Blue"] = 4] = "Blue";
        })(Color || (Color = {}));
        var colorName = Color[2];
        console.log("colorName:" + colorName);
        alert(colorName);
        // Any类型的变量直接通过编译街阶段的编译 运行时检查
        var notSure = 4;
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
        var someValue = "this is a string";
        var strLength = someValue.length;
        strLength = someValue.length;
    };
    /**
     * 变量声明
     */
    TypeScriptTutorial.prototype.showVariableDeclarationTutorial = function () {
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
        var var2;
        // 暂时性死区 方法可以访问后定义的let变量 但是 该方法实际调用时 该变量必须已定义
        //let在一个嵌套作用域里引入一个新名字的行为称做屏蔽
        //这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i
        //var用来定义i却不行 值会出现被覆盖的情况 结果不可预测
        function sumMatrix(matrix) {
            var sum = 0;
            for (var i_1 = 0; i_1 < matrix.length; i_1++) {
                var currentRow = matrix[i_1];
                for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
                    sum += currentRow[i_2];
                }
            }
            return sum;
        }
        var _loop_1 = function (i_3) {
            setTimeout(function () { console.log(i_3); }, 100 * i_3);
        };
        //var和let的进一步差异化
        //当let声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，
        //而是针对 每次迭代都会创建这样一个新作用域。 这就是我们在使用立即执行的函数表达式时做的事，
        //所以在 setTimeout例子里我们仅使用let声明就可以了
        for (var i_3 = 0; i_3 < 10; i_3++) {
            _loop_1(i_3);
        }
    };
    /*
    * 接口
    */
    TypeScriptTutorial.prototype.ShowInterfaceTutorial = function () {
        var digital = createClock(DigitalClock, 12, 17);
        var analog = createClock(AnalogClock, 7, 32);
    };
    TypeScriptTutorial.prototype.getCounter = function () {
        var counter = function (start) { return "counter:" + start; };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    };
    TypeScriptTutorial.prototype.ShowMixInterface = function () {
        var c = this.getCounter();
        console.log(c(10));
        c.reset();
        c.interval = 5.0;
    };
    return TypeScriptTutorial;
}());
__reflect(TypeScriptTutorial.prototype, "TypeScriptTutorial");
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = (function () {
    function DigitalClock(h, m) {
        console.log("DigitalClock constructor");
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
__reflect(DigitalClock.prototype, "DigitalClock", ["ClockInterface"]);
var AnalogClock = (function () {
    function AnalogClock(h, m) {
        console.log("AnalogClock constructor");
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
__reflect(AnalogClock.prototype, "AnalogClock", ["ClockInterface"]);
//# sourceMappingURL=TypeScriptTutorial.js.map