function logArguments(fn) {
    return function (...args) {
        console.log('Arguments', args);
        return fn.apply(this, args);
    }
}
function add(a, b) {
    return a + b;
}

const decoratedAdd = logArguments(add);
console.log(decoratedAdd(2, 3))


function validate(fn, validator) {
    return function (...args) {
        if (!validator.apply(this, args)) {
            throw "not valid"
        }
        return fn.apply(this, args);
    }
}

function validator(a, b) {
    return a > 0
}

const validatedAdd = validate(add, validator);
console.log(validatedAdd(2, 3))



function retry(fn, maxAttempts) {
    return function (...args) {
        let attempts = 0;

        const tryCall = () => {
            try {
                return fn.apply(this, args);
            } catch (error) {
                attempts++;
                if (attempts == maxAttempts) {
                    throw error;
                } else {
                    return tryCall();
                }
            }
        }

        return tryCall();
    }
};

let attempt = 1;
function failed() {
    if (attempt++ < 5) {
        throw "Error"
    }

    return "Hello world"
}

const failedretry = retry(failed, 5)
console.log(failedretry())
