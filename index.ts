class StatisticsApp
{
    data1Input: HTMLInputElement;
    data2Input: HTMLInputElement;
    data3Input: HTMLInputElement;
    data4Input: HTMLInputElement;

    sum1Input: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;

    constructor()
    {
        this.startApp();
    }

    startApp()
    {
        this.getInputs();
        this.inputsObserver();
    }

    inputsObserver() 
    {
        this.data1Input.addEventListener("input", () => this.getStatistics());
        this.data1Input.addEventListener("input", () => this.getStatistics());
        this.data1Input.addEventListener("input", () => this.getStatistics());
        this.data1Input.addEventListener("input", () => this.getStatistics());
    }

    getInputs() 
    {
        this.data1Input = document.querySelector('#data1');
        this.data2Input = document.querySelector('#data2');
        this.data3Input = document.querySelector('#data3');
        this.data4Input = document.querySelector('#data4');

        this.sum1Input = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    }

    getValue(element : HTMLInputElement) : number {
        const {value} = element;
        return Number.isInteger(value) ? parseInt(value) : 0;
    }

    getStatistics()
    {
        const data1 = this.getValue(this.data1Input);
        const data2 = this.getValue(this.data2Input);
        const data3 = this.getValue(this.data3Input);
        const data4 = this.getValue(this.data4Input);

        const sum = data1 + data2 + data3 + data4;
        const avg = sum / 4;
        const min = Math.min(data1, data2, data3, data4);
        const max = Math.max(data1, data2, data3, data4);
    }
}