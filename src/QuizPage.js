import React, { useState } from 'react'
import { data } from './component/data'

function QuizPage() {

const [currentPage,setCurrentPage] = useState(0);
const [selectedAnswer,setSelectedAnswer] = useState('');
const [showComment, setShowComment] = useState('')
// const [showResult, setShowResult] = useState(true)

// const [selectedAnswer,setSelectedAnswer] = useState(Array(data.length).fill(null));
const [score,setScore] = useState(0);
const [isAnswered, setIsAnswered] = useState(false)

const handleChange = (e) =>{
    
    setSelectedAnswer(e.target.value);
    setIsAnswered(true) //disable options after selections
    if (e.target.value === data[currentPage].correctAnswer) {
        setShowComment("Correct!")
    } else{
        setShowComment("Oops! Incorrect!")
    }
    
}


const handleNext = () =>{

    if (selectedAnswer === data[currentPage].correctAnswer) {
        const percent = score + 1 *20
        setScore(percent) 
    }

    if (currentPage < data.length) {
        setCurrentPage((prev ) => prev + 1); 
        setShowComment("")
    setIsAnswered(false) //disable options after selections

        // setShowResult('')
        // console.log(setShowResult)
        
    }
     
    
}

if (currentPage === data.length - 1) {
        document.getElementById('question').textContent = "";
        document.getElementById('instruction').textContent = "";
        document.getElementById('btn').textContent = ""
        
    }

    if (currentPage === data.length -2) {
        document.getElementById('button').innerText = "Submit"
        
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
                        disabled={isAnswered}
                        /> {option}
                    </label>
                    
                </div>
                ))}
            </div>                                  

            <div id='comment' className={`italic mt-4 text-2xl text-lime-500 ${showComment? "block" : "hidden "}`}>{showComment}</div>
             {LastQuestion && (<div className='italic mt-4 text-4xl text-center ' id='score'>Your Total Score is:
              <span className='text-lime-500 text-5xl p-10'><br/>{score}% </span>
              </div>)}

            <div className='flex justify-between w-full pt-8' id='btn'> 
                <button type='button' id='button' 
                className='rounded-md bg-lime-500 h-[50px] w-[100px] text-slate-50 font-bold text-lg '
                onClick={handleNext} disabled={LastQuestion} 
                    >Next
                </button>
            </div>

          

        </div>

    </div>
  )
}

export default QuizPage;