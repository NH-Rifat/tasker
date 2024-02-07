import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import { TaskContext } from "./contexts";
import { TaskReducer, initialState } from "./reducers/TaskReducer";
import TaskBoard from "./task/TaskBoard";

function App() {
    const [state, dispatch] = useReducer(TaskReducer, initialState);
    return (
        <>
            <TaskContext.Provider value={{ state, dispatch }}>
                <Header />
                <Hero />
                <TaskBoard />
                <Footer />
                <ToastContainer />
            </TaskContext.Provider>
        </>
    );
}

export default App;
