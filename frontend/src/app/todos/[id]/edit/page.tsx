import TodoEdit from "@/app/conponents/TodoEdit";

const TodoEditpage = ({ params }: { params: { id: Number } }) => {
    return <TodoEdit id={params.id} />;
};

export default TodoEditpage;
