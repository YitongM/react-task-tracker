import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}
		
		getTasks()
	}, [])
	
	// Fetch data
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks')
		const data = await res.json()

		return data
	}
	
	// Add
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			header: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(task)
		})

		const data = await res.json()
		setTasks([...tasks, data])
		
		// const id = Math.floor(Math.random() * 10000) + 1
		// const newTask = { id, ...task }
		// setTasks([...tasks, newTask])
	}

	// Delete a task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE'
		})
		
		setTasks(tasks.filter((task) => task.id != id))
	}

	// Toggle Reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) => 
				task.id === id ? {...task, reminder: !task.reminder} : task
			)
		)
	}

	return (
		<div className='container'>
			<Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
			{/* Equals to showAddTask ? <AddTask onAdd={addTask} /> : nothingHere */}
			{ showAddTask && <AddTask onAdd={addTask} />}
			{ tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'All tasks cleared!! :)'}
		</div>
	);
}

export default App;
