import React from "react";


import { TodoList } from "./TodoList.jsx";


const Home = () => {

	return (
		<>
			<div className="mt-5 d-flex justify-content-center">
				<h1>ToDo List <i className="fa-regular fa-calendar"></i></h1>
			</div>
			<TodoList />
		</>


	);
};

export default Home;