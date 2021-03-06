//import {createStore} from './createStore'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import './styles.css'
import {rootReducer} from "./redux/rootReducer";
//import {INCREMENT, DECREMENT} from "./redux/types";
import {increment, decrement, asyncIncrement, changeTheme} from "./redux/actions";

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

store.subscribe( () => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value
})

store.dispatch( {type: 'INIT_APPLICATION' })

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
    ? 'dark'
    : 'light'
    store.dispatch(changeTheme(newTheme))
})