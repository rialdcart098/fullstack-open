import Course from './Course'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                id: 0,
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                id: 1,
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                id: 2,
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return <Course course={course} />
}

export default App