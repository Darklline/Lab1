"use strict";
class StatisticsApp {
    constructor() {
        console.log(this);
        this.startApp();
    }
    startApp() {
        this.getInputs();
        this.inputsObserver();
    }
    inputsObserver() {
        this.data1Input.addEventListener("input", () => this.getStatistics());
        this.data2Input.addEventListener("input", () => this.getStatistics());
        this.data3Input.addEventListener("input", () => this.getStatistics());
        this.data4Input.addEventListener("input", () => this.getStatistics());
    }
    getInputs() {
        this.data1Input = document.querySelector('#data1');
        this.data2Input = document.querySelector('#data2');
        this.data3Input = document.querySelector('#data3');
        this.data4Input = document.querySelector('#data4');
        this.sum1Input = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    }
    getValue(element) {
        const { value } = element;
        const intValue = parseInt(value);
        return intValue !== NaN ? intValue : 0;
    }
    setValue(element, value) {
        element.value = value;
    }
    getStatistics() {
        const data1 = this.getValue(this.data1Input);
        const data2 = this.getValue(this.data2Input);
        const data3 = this.getValue(this.data3Input);
        const data4 = this.getValue(this.data4Input);
        const sum = data1 + data2 + data3 + data4;
        const avg = sum / 4;
        const min = Math.min(data1, data2, data3, data4);
        const max = Math.max(data1, data2, data3, data4);
        this.showStatistics(sum, avg, min, max);
    }
    showStatistics(sum, avg, min, max) {
        this.setValue(this.sum1Input, sum.toString());
        this.setValue(this.avgInput, avg.toString());
        this.setValue(this.minInput, min.toString());
        this.setValue(this.maxInput, max.toString());
    }
}
const app = new StatisticsApp();
