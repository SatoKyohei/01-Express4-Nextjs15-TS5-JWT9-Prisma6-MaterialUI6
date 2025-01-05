import TodoDetail from "@/app/conponents/TodoDetail";

const page = ({ params }: { params: { id: Number } }) => {
    return <TodoDetail id={params.id} />;
};

export default page;
