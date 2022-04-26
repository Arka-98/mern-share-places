import React, { useReducer } from 'react'

export const FORM_ACTIONS = {
    SET_INPUT: 'SET_INPUT',
    SET_ERRORS: 'SET_ERRORS',
    SET_CUSTOM_INPUT: 'SET_CUSTOM_INPUT',
    TRIM_INPUT: 'TRIM_INPUT',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    SET_INPUT_AND_ERRORS: 'SET_INPUT_AND_ERRORS',
    CHECK_PASSWORDS: 'CHECK_PASSWORDS',
    CHECK_ERROR: 'CHECK_ERROR',
    VALIDATE_INPUT: 'VALIDATE_INPUT'
}

function reducer(state, action) {
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    let passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    switch(action.type) {
        case FORM_ACTIONS.SET_INPUT:
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.value } }
        case FORM_ACTIONS.SET_ERRORS:
            return { ...state, errors: { ...state.errors, [action.payload.name]: !Boolean(action.payload.value) } }
        case FORM_ACTIONS.SET_CUSTOM_INPUT:
            let customInput = {}
            for(let i in state.input) {
                customInput = { ...customInput, [i]: action.payload[i] }
            }
            return { ...state, input: customInput }
        case FORM_ACTIONS.TRIM_INPUT:
            // let trimmedInput = {}
            // for(let i in state.input) {
            //     if(i !== 'image') {
            //         trimmedInput = { ...trimmedInput, [i]: state.input[i].trim() }
            //     }
            //     console.log(i, typeof i, state.input[i], typeof state.input[i])
            // }
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.name === 'image' ? action.payload.value : action.payload.value.trim() } }
        case FORM_ACTIONS.SET_INPUT_AND_ERRORS:
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.value }, errors: { ...state.errors, [action.payload.name]: !Boolean(action.payload.value)  } }
        case FORM_ACTIONS.TOGGLE_LOADING:
            return { ...state, loading: !state.loading }
        case FORM_ACTIONS.CHECK_PASSWORDS:
            return { ...state, errors: { ...state.errors, confPassword: state.errors.confPassword === null ? null : action.payload.name === 'password' ? (action.payload.value === state.input.confPassword ? false : true ) : action.payload.value === state.input.password ? !Boolean(action.payload.value) : true } }
        case FORM_ACTIONS.CHECK_ERROR:
            for(let i in state.errors) {
                if(state.errors[i] || state.errors[i] === null) {
                    return { ...state, isError: true }
                }
            }
            return { ...state, isError: false }
        case FORM_ACTIONS.VALIDATE_INPUT:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name]:
                        action.payload.name === 'contact' ? (action.payload.value.length !== 10 ? true : !Boolean(action.payload.value)) :
                        action.payload.name === 'email' ? !emailRegex.test(action.payload.value) :
                        (action.payload.name === 'password' || action.payload.name === 'confPassword') ? !passwordRegex.test(action.payload.value) :
                        action.payload.name === 'image' ? !Boolean(action.payload.value) :
                        !Boolean(action.payload.value.trim())
                }
            }
        default:
            return state
    }
}

function useForm(initialState) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return [state, dispatch]
}

export default useForm