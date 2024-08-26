import React, { useState } from 'react'
import { data } from './component/data'

function QuizPage() {

const [currentPage,setCurrentPage] = useState(0);
const [selectedAnswer,setSelectedAnswer] = useState('');
const [showComment, setShowComment] = useState('')
const [showResult, setShowResult] = useState(true)

// const [selectedAnswer,setSelectedAnswer] = useState(Array(data.length).fill(null));
const [score,setScore] = useState(0);

const handleChange = (e) =>{
    
    setSelectedAnswer(e.target.value);
    if (e.target.value === data[currentPage].correctAnswer) {
        setShowComment("correct!")
    } else{
        setShowComment("oops! Incorrect!")
    }
    
}


const handleNext = () =>{

    if (selectedAnswer === data[currentPage].correctAnswer) {
        setScore(score + 1)
    }

    if (currentPage < data.length) {
        setCurrentPage((prev ) => prev + 1); 
        setShowComment("")
        setShowResult(showResult)
        
    }
     
    
}

if (currentPage === data.length-1) {
        document.getElementById('question').textContent = "";
        document.getElementById('instruction').textContent = "";
        document.getElementById('btn').textContent = ""
        document.getElementById('score').textContent = "Your Total Score: " + score + "/" + (data.length - 1)
        document.getElementById('score').style.fontSize = "48px";
        document.getElementById('score').style.textAlign = "center"
        document.getElementById('score').style.lineHeight = "50px"



        
    }



const currentData = data[currentPage]
const LastQuestion = currentPage === data.length - 1;





  return (
    <div className='w-full'>
        <div id='quiz' className=' w-[80%] m-auto'>
            <div className='text-center md:w-[20%] sm: w-[70%] m-auto p-4'>
                <h1 className=' text-lime-500 text-3xl font-bold shadow-md p-4  shadow-lime-950 '>QUIZ GAME</h1>
            </div>

            <div className='border-b border-lime-500 flex justify-around w-full' id='instruction'> 
                <p className=' text-lime-600 pt-10 text-lg text-justify '>
                    Instruction: There is a total of 10 questions and each question has four options. Choose the possible best answer
                </p>
            
                {/* <h1 className='text-lime-600 pt-10 text-2xl' id='score'>Score: {score}</h1> */}
            </div>

            <div  className='w-full pt-8'  id='question'>
                <h1 className='text-lg'>{currentPage+1}. {currentData.question}</h1>
            </div>

            <div id='options' className='w-full m-auto pt-8'>
                {currentData.options.map((option,index)=>( 
                <div key={index}>
                    <label >
                        <input type='radio' value={option}  className='mt-4 ' 
                        checked = {selectedAnswer === option}
                        onChange={ handleChange }
                        /> {option}
                    </label>
                    
                </div>
                ))}
            </div>                                  

            <div id='comment' className={`italic mt-4 text-lg ${showComment? "block" : "hidden "}`}>{showComment}</div>
             <div className={`italic mt-4 text-lg ${showResult === true ? "block" : "hidden"} `} id='score'>{score}/{(data.length - 1)}</div>

            <div className='flex justify-between w-full pt-8' id='btn'> 
                <button type='button' 
                className='rounded-md bg-lime-500 h-[50px] w-[100px] text-slate-50 font-bold text-lg '
                onClick={handleNext} disabled={LastQuestion} 
                    >Submit
                </button>
            </div>

          

        </div>

    </div>
  )
}

export default QuizPage;