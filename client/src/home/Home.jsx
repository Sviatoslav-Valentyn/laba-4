import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';

const Home = () => {
    return (
        <div className="main-wrap">
           <Header />
           
           <div className="content-home">
           <Timer />
            <p className="mainH">Together we are strong</p>
               <p className="desc">
               On the morning of February 24, 2022, Russia launched a full-scale invasion of Ukraine without declaring war. All the money will be used to help Ukraine.
               </p>
               <div className="btn">
                   <a href="./register">
                       <p>Join us now</p>
                   </a>
                   <a href="http://localhost:3001">
                       <p>Donate now</p>
                   </a> 
               </div>
           </div>
        </div>
    );
}

export default Home;
