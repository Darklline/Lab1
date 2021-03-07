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

    startApp()
    {
        this.getInputs();
        this.inputsObserver();
    }
    inputsObserver() {
        throw new Error("Method not implemented.");
    }
    getInputs() {
        throw new Error("Method not implemented.");
    }
    getStatistics(): any {
        throw new Error("Method not implemented.");
    }
}