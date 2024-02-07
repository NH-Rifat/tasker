import { useContext, useState } from "react";
import { TaskContext } from "../contexts";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
    const { state, dispatch } = useContext(TaskContext);

    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {
            dispatch({
                type: "ADD_TASK",
                payload: newTask,
            });
        } else {
            dispatch({
                type: "UPDATE_TASK",
                payload: newTask,
            });
        }
        setShowAddTaskModal(false);
    };

    const handleEditTask = (editedTask) => {
        setTaskToUpdate(editedTask);
        setShowAddTaskModal(true);
    };

    const handleCloseClick = () => {
        setShowAddTaskModal(false);
        setTaskToUpdate(null);
    };

    return (
        <section className="mb-20" id="tasks">
            {showAddTaskModal && (
                <AddTaskModal
                    handleCloseClick={handleCloseClick}
                    taskToUpdate={taskToUpdate}
                    onSave={handleAddEditTask}
                />
            )}
            <div className="container mx-auto">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={setSearchTerm} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onAddClick={() => setShowAddTaskModal(true)} />
                    {state.tasks.length > 0 ? (
                        <TaskList
                            setTaskToUpdate={setTaskToUpdate}
                            searchTerm={searchTerm}
                            onEdit={handleEditTask}
                        />
                    ) : (
                        <NoTaskFound />
                    )}
                </div>
            </div>
        </section>
    );
}
