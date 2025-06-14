import { Link } from "react-router"
import Button from "../components/Button"

const Home = () => {
  return (
    <section className="hero-section">
        <h1 className="text-center text-[5rem] font-bold max-md:text-[4rem] max-sm:text-[2.5rem] company-name">Beleaf Technologies</h1>
        <h1 className="text-center text-5xl max-md:text-4xl max-sm:text-2xl font-bold">Full Stack Development Task</h1>
        <ul className="ml-8 list-disc text-[1.2rem] max-md:text-lg max-sm:text-[1rem] ">
            <li> To implement CRUD Operations</li>
            <li> To Fetch data from JsonPlaceholder</li>
            <li> To use React for FrontEnd, Node.js for BackEnd, MongoDB for DataBase</li>
        </ul>
       <Link className={'view-post-button blue-gradient'}>
            View Posts
       </Link>

    </section>
  )
}

export default Home