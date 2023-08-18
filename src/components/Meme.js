import React from "react";
import memesData from "../memesData";
import { useState }  from "react";
import { useEffect } from "react";
export default function Meme(){

//    const [memeImage, setMemeImage] = React.useState("https://i.imgflip.com/1g8my4.jpg");
      const [meme, setMeme] = useState({
          topText:"",
          bottomText:"",
          randomImage: "https://i.imgflip.com/1g8my4.jpg"

      })


      const [allMemes, setAllMemes] = useState([])

    //   useEffect(()=>{
    //       fetch("https://api.imgflip.com/get_memes")
    //       .then(res => res.json())
    //       .then(data => setAllMemes(data.data.memes))
    //   }, [])

    useEffect(()=>{
        async function getMemes(){
         const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
        }
       getMemes()
    }, [])
      console.log(allMemes)
    //   const [allMemeImages, setAllMemeImage] = useState(memesData)


      
    function getMemeImage(){
       
        const randonNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randonNumber].url
        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage:url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }
    return(
        <main>
            
            <div className="form">
                <input
                type="text"
                placeholder="Top Text"
                className="form--inputs"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
                   
                />
                <input 
                type="text"
                placeholder="Bottom Text"
                className="form--inputs"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                  />

                <button className="form--button"
                onClick={getMemeImage}
                >
                Get a new meme image
                </button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} className="meme--image"  alt="MemeImage"/>
            <h2 className="meme--text--top">{meme.topText}</h2>
            <h2 className="meme--text--bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}