const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part) => (
                <p key={part.id}>{part.name} {part.exercises}</p>
            ))}
        </div>
    )
}
const Total = ({parts}) => {
    let total = 0;
    parts.forEach(part => total += part.exercises);
    return (
        <p>{total}</p>
    )
}
const Course = ({course}) => 
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

export default Course