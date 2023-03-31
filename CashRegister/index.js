function checkCashRegister(price, cash, cid) {
    const currencyObj = {
        "PENNY": 1,
        "NICKEL": 5,
        "DIME": 10,
        "QUARTER": 25,
        "ONE": 100,
        "FIVE": 500,
        "TEN": 1000,
        "TWENTY": 2000,
        "ONE HUNDRED": 10000
    };

    let change = (cash * 100) - (price * 100);
    let cidAmount = 0;
    for (let item of cid) {
        cidAmount += item[1] * 100;
    }

    if (change > cidAmount) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (change === cidAmount) {
        return {status: "CLOSED", change: cid};
    } else {
        let answer = []
        cid = cid.reverse();
        for (let item of cid) {
            let cashHolder = [item[0], 0];
            item[1] = item[1] * 100
            while (change >= currencyObj[item[0]] && item[1] > 0) {
                change -= currencyObj[item[0]]
                item[1] -= currencyObj[item[0]]
                cashHolder[1] += currencyObj[item[0]] / 100
            }

            cashHolder[1] > 0 ? answer.push(cashHolder) : [];
        }
        if (change > 0) {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        }

        return {status: "OPEN", change: answer};
    }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));