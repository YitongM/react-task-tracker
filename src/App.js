import { useState } from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

function App() {
	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctor',
			day: '2021.2.1 @ 14:30',
			reminder: true
		},
		{
			id: 2,
			text: 'Meeting',
			day: '2021.2.2 @ 14:30',
			reminder: false
		},
		{
			id: 3,
			text: 'Food',
			day: '2021.2.3 @ 14:30',
			reminder: true
		}
	])

	// Add
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 10000) + 1
		const newTask = { id, ...task }
		setTasks([...tasks, newTask])
	}

	// Delete a task
	const deleteTask = (id) => {
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
