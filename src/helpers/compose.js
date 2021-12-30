const compose = (...func) => (...args) => func.reduce((a, b) => a(b(...args)))

export default compose