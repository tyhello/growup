"use strict";

var GrowupItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.value = obj.value;
        this.date = obj.date;
    } else {
        this.key = "";
        this.author = "";
        this.value = "";
    }
};

GrowupItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var Growup = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new GrowupItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Growup.prototype = {
    init: function () {
    },
    save: function (value, date) {
        var from = Blockchain.transaction.from;
        var growupItem = this.repo.get(from);
        if (growupItem) {
            //throw new Error("value has been occupied");
            growupItem.value = JSON.parse(growupItem).value + '|-' + value;
            growupItem.date = JSON.parse(growupItem).date + '|-' + date;
            this.repo.put(from, growupItem);

        } else {
            growupItem = new GrowupItem();
            growupItem.key = from;
            growupItem.value = value;
            growupItem.date = date;
            this.repo.put(from, growupItem);
        }
    },
    get: function () {
        var from = Blockchain.transaction.from;
        return this.repo.get(from);
    }
};
module.exports = Growup;