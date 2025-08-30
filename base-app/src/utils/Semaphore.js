
function Semaphore(wait, callback) {

    this.callback = callback;
    this.wait = wait;
    this.counted = 0;

}

Semaphore.prototype.signal = function signal() {
    this.counted++;
    if (this.counted >= this.wait) {
        this.callback();
    }
}

module.exports = Semaphore;