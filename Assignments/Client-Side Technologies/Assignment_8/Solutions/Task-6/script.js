// ============= setTimeout() --> Using Date() ==========

function wait5Seconds() {
    // set the currrent timestamp
    // loop => unknown iterations
        // calculate the time difference
        // if: timeDifference >= 5000
            // T => fire an operation
            // F => nothing

    const currentTime = Date.now();
    let timeDifference;
    let isTimeOver = false;

    while (!isTimeOver) {
        timeDifference = Date.now() - currentTime;
        if (timeDifference >= 5000) {
            isTimeOver = true;
        }
    }

    console.log('5 seconds have passed');
}



wait5Seconds();