import '../App.css';
import Header from '../templates/Header';
import Timer from '../templates/Timer';
import {useEffect, useState} from "react";
import axios from "axios";

const Comment = () => {

    const [mm, setMm] = useState(false)

    const fetchComments = () => {
        const request = axios.get('http://localhost:3001/feedback')
            .then(data => {
                document.getElementsByClassName('block-coment')[0].innerHTML = '';
                for(let i = 0; i < data.data.length; i++) {
                    document.getElementsByClassName('block-coment')[0].innerHTML += `
            <div class="comment">
                        <p>${data.data[i].Comment}</p>
                    </div>
            `;
                }
            });
    }

    const [comm, setComm] = useState({
        comm: ''
    });

    const addNew = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/feedback', {
            Comment: comm.comm
        })
        alert('Added!')
        window.location.reload()
    }

    useEffect(() => {
        if(!mm) {
            setMm(true)
            console.log('me')
            fetchComments()
        }
    }, [])

    return (
        <div className="main-wrap">
            <Header />

            <div className="content-home">
                <Timer />
                <p className="textC">Comments</p>
                <div className="block-coment">
                    {/*<div className="comment">*/}
                    {/*    <div className="title-comment">*/}
                    {/*        <h4>Іван Іванов</h4>*/}
                    {/*        <span>11.04.2022 19:43</span>*/}
                    {/*    </div>*/}
                    {/*    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam molestias, error reiciendis eligendi perferendis explicabo. Temporibus facilis, voluptatem doloribus quis asperiores qui ducimus at reiciendis dolorem adipisci totam delectus dolor?</p>*/}
                    {/*</div>*/}
                    {/*<div className="comment">*/}
                    {/*    /!*<div className="title-comment">*!/*/}
                    {/*    /!*    <h4>Іван Іванов</h4>*!/*/}
                    {/*    /!*    <span>11.04.2022 19:43</span>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam molestias, error reiciendis eligendi perferendis explicabo. Temporibus facilis, voluptatem doloribus quis asperiores qui ducimus at reiciendis dolorem adipisci totam delectus dolor?</p>*/}
                    {/*</div>*/}
                    {/*<div className="comment">*/}
                    {/*    <div className="title-comment">*/}
                    {/*        <h4>Іван Іванов</h4>*/}
                    {/*        <span>11.04.2022 19:43</span>*/}
                    {/*    </div>*/}
                    {/*    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam molestias, error reiciendis eligendi perferendis explicabo. Temporibus facilis, voluptatem doloribus quis asperiores qui ducimus at reiciendis dolorem adipisci totam delectus dolor?</p>*/}
                    {/*</div>*/}
                </div>
                <div className="add-coment">
                    <form onSubmit={addNew}>
                        <h4>Add comment</h4>
                        <p>Message: </p>
                        <textarea name="" id="" cols="30" rows="10"
                                  onChange={event => {setComm({ comm: event.target.value})}}></textarea>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Comment;
