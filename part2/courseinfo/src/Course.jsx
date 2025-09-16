const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part) => (
                <Part part={part} />
            ))}
        </div>
    )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => {
    let total = parts.reduce((accumulator, currentPart) => 
        accumulator + currentPart.exercises, 0
    )
    return (
        <p>total of {total} exercises</p>
    )
}
const Course = ({course}) => 
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

export default Course