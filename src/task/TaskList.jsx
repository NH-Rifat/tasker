/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { TaskContext } from "../contexts";

export default function TaskList({ setTaskToUpdate, searchTerm, onEdit }) {
    const { state, dispatch } = useContext(TaskContext);

    const filterData = state.tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                            {" "}
                            Title{" "}
                        </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                            {" "}
                            Description{" "}
                        </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                            {" "}
                            Tags{" "}
                        </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                            {" "}
                            Priority{" "}
                        </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                            {" "}
                            Options{" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((task) => (
                        <tr
                            key={task.id}
                            className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                        >
                            <td>
                                <button
                                    onClick={() => {
                                        dispatch({
                                            type: "FAV_TASK",
                                            payload: task.id,
                                        });
                                    }}
                                >
                                    {task.isFavorite ? (
                                        <FaStar color="yellow" size={20} />
                                    ) : (
                                        <FaStar color="gray" size={20} />
                                    )}
                                </button>
                            </td>
                            <td>{task.title}</td>
                            <td>
                                <div>{task.description}</div>
                            </td>
                            <td>
                                <ul className="flex justify-center gap-1.5 flex-wrap">
                                    {task.tags.map((tag) => {
                                        const color = {
                                            web: "bg-[#00D991A1]",
                                            react: "bg-[#1C92FFB0]",
                                            js: "bg-[#00D991A1]",
                                            python: "bg-[#1C92FFB0]",
                                            api: "bg-[#FE1A1AB5]",
                                        };
                                        return (
                                            <li key={tag}>
                                                <span
                                                    className={`inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6] ${
                                                        color[tag] ||
                                                        "bg-[#1C92FFB0]"
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </td>
                            <td className="text-center">{task.priority}</td>
                            <td>
                                <div className="flex items-center justify-center space-x-3">
                                    <button
                                        onClick={() => {
                                            setTaskToUpdate(null);
                                            window.confirm(
                                                "Are you sure you want to delete this task?"
                                            ) &&
                                                dispatch({
                                                    type: "DELETE_TASK",
                                                    payload: task.id,
                                                });
                                        }}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => onEdit(task)}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
