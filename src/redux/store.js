import { search_reducer } from "./reducer";
import {createStore} from "redux"

const store = createStore(search_reducer);

export default store;