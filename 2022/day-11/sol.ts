// !!!! Terrible way to set up values. !!!!
// used for testing.
const testMonkeys = [
  {
    items: [79, 98],
    itemsInspected: 0,
    testInteger: 23,
    operation(old: number) {
      return (old * 19);
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 2 : 3;
    },
  },
  {
    items: [54, 65, 75, 74],
    itemsInspected: 0,
    testInteger: 19,
    operation(old: number) {
      return (old + 6);
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 2 : 0;
    },
  },
  {
    items: [79, 60, 97],
    itemsInspected: 0,
    testInteger: 13,
    operation(old: number) {
      return (old * old);
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 1 : 3;
    },
  },
  {
    items: [74],
    itemsInspected: 0,
    testInteger: 17,
    operation(old: number) {
      return (old + 3);
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 0 : 1;
    },
  },
];

const monkeys = [
  {
    items: [72, 64, 51, 57, 93, 97, 68],
    itemsInspected: 0,
    testInteger: 17,
    operation(old: number) {
      return old * 19;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 4 : 7;
    },
  },
  {
    items: [62],
    itemsInspected: 0,
    testInteger: 3,
    operation(old: number) {
      return old * 11;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 3 : 2;
    },
  },
  {
    items: [57, 94, 69, 79, 72],
    itemsInspected: 0,
    testInteger: 19,
    operation(old: number) {
      return old + 6;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 0 : 4;
    },
  },
  {
    items: [80, 64, 92, 93, 64, 56],
    itemsInspected: 0,
    testInteger: 7,
    operation(old: number) {
      return old + 5;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 2 : 0;
    },
  },
  {
    items: [70, 88, 95, 99, 78, 72, 65, 94],
    itemsInspected: 0,
    testInteger: 2,
    operation(old: number) {
      return old + 7;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 7 : 5;
    },
  },
  {
    items: [57, 95, 81, 61],
    itemsInspected: 0,
    testInteger: 5,
    operation(old: number) {
      return old * old;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 1 : 6;
    },
  },
  {
    items: [79, 99],
    itemsInspected: 0,
    testInteger: 11,
    operation(old: number) {
      return old + 2;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 3 : 1;
    },
  },
  {
    items: [68, 98, 62],
    itemsInspected: 0,
    testInteger: 13,
    operation(old: number) {
      return old + 3;
    },
    test(val: number) {
      return val % this.testInteger === 0 ? 5 : 6;
    },
  },
];


function monkeyBusiness(monkeysInUse: {
  items: number[],
  itemsInspected: number,
  testInteger: number,
  operation(old: number): number,
  test(val: number): number ,
}[], numberOfRounds: number, stress: number) {
  const leastCommonMultiple = monkeysInUse.reduce((prev, monkey) => prev * monkey.testInteger, 1)
  for (let i = 0; i < numberOfRounds; ++i) {
    monkeysInUse.forEach((monkey) => {
      while (monkey.items.length !== 0) {
        const item = monkey.items.shift() as number
        const opResult = monkey.operation(item) % leastCommonMultiple;
        const reliefResult = stress > 1 ? Math.floor(opResult / stress) : opResult;
        const testResult = monkey.test(reliefResult);
        monkeysInUse[testResult].items.push(reliefResult)
        monkey.itemsInspected++;
      }
    })
  }
  
  let topMonkeyInspected1 = 0;
  let topMonkeyInspected2 = 0;
  monkeysInUse.forEach((monkey) => {
    if (monkey.itemsInspected >= topMonkeyInspected1) {
      topMonkeyInspected2 = topMonkeyInspected1
      topMonkeyInspected1 = monkey.itemsInspected
      return;
    }
    if (monkey.itemsInspected >= topMonkeyInspected2) {
      topMonkeyInspected2 = monkey.itemsInspected
      return;
    }
  })
  return topMonkeyInspected1 * topMonkeyInspected2;
}
console.log("Monkey business value:", monkeyBusiness(monkeys.map((monkey) => ({
  items: [...monkey.items],
  itemsInspected: monkey.itemsInspected,
  testInteger: monkey.testInteger,
  operation: monkey.operation,
  test: monkey.test
})), 20, 3))
console.log("Monkey business value:", monkeyBusiness(monkeys.map((monkey) => ({
  items: [...monkey.items],
  itemsInspected: monkey.itemsInspected,
  testInteger: monkey.testInteger,
  operation: monkey.operation,
  test: monkey.test
})), 10000, 1))
