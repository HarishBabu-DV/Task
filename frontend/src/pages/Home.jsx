import Button from "../components/Button"

const Home = () => {
  return (
    <section className="hero-section">
        <h1 className="text-[5rem] font-bold company-name">Beleaf Technologies</h1>
        <h1 className="text-5xl font-bold">Full Stack Development Task</h1>
        <ul className="list-disc text-[1.2rem]">
            <li> To implement CRUD Operations</li>
            <li> To Fetch data from JsonPlaceholder</li>
            <li> To use React for FrontEnd, Node.js for BackEnd, MongoDB for DataBase</li>
        </ul>
        
        <Button className={'view-post-button blue-gradient'}>
            View Posts
        </Button>
       

    </section>
  )
}

export default Home