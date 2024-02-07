/* eslint-disable no-const-assign */
/* eslint-disable no-case-declarations */
const initialState = {
    tasks: [
        {
            id: crypto.randomUUID(),
            title: "Learn React",
            description:
                "I want to Learn React such than I can treat it like my slave and make it do whatever I want it to do.",
            tags: ["web", "react", "js"],
            priority: "High",
            isFavorite: true,
        },
    ],
};

const TaskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case "DELETE_ALL_TASK":
            return {
                ...state,
                tasks: [],
            };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            ...action.payload,
                        };
                    }
                    return task;
                }),
            };

        case "FAV_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task.id === action.payload) {
                        return { ...task, isFavorite: !task.isFavorite };
                    }
                    return task;
                }),
            };
        default:
            return state;
    }
};

export { TaskReducer, initialState };
