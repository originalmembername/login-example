import { createStore } from "vuex";
import { authModule } from "./authModule";

export const store = createStore({
    modules: {
        authModule
    }
})