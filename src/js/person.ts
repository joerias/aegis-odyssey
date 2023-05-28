export interface PersonOptsType {
	name: string;
	age: number;
}
type typeEnum = "Hello" | "Hey";
export class Person {
	name: string;
	age: number;

	/**
	 * @description 基本入参
	 * @param name 姓名
	 * @param age 年龄
	 * @return void
	 */
	constructor(opts: PersonOptsType) {
		this.name = opts.name;
		this.age = opts.age;
	}

	/**
	 * @description 打招呼方法
	 * @param type 开口类型：hello/hey
	 * @return string
	 */
	call(type: typeEnum) {
		return `${type}, my name is ${this.name}, age is ${this.age}`;
	}
}
