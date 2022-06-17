export default function logger(reducer) {
    return (prveState, action, args) => {
        console.group(action)
        console.log('prve state:' , prveState)
        console.log('args:' , args)
        const nextState = reducer(prveState, action, args)
        console.log('next state:', nextState)

        console.groupEnd()
        return nextState
    }
}