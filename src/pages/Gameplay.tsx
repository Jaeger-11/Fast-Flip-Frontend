import { useState, useEffect } from "react";
import { FlipCard } from "../types/interface";
import Result from "../components/Result";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Gameplay = () => {
    const navigate = useNavigate()
    const baseScore = 1000;
    const [match, setMatch] = useState<number>(0);
    const [mismatch, setMisMatch] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [cards, setCards] = useState<FlipCard[]>([]);
    const [score, setScore] = useState<number>(0);
    const [timeTaken, setTimeTaken] = useState<number>(0)
    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const fetchImages = async () => {
        try {
            const response = await useAxios('/images');
            let data = await response.data.data;
            data.map((item:{name:string, imageUrl:string, isFlipped:boolean}) => {
                item.isFlipped = false;
                return item
            })
            shuffleArray(data);  
        } catch (error) {
            console.log(error)
        }
    }

    const shuffleArray = (list:FlipCard[]) => {
        var currentIndex = list.length; 
        var randomIndex;
        var temporaryValue;

        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue
        }

        setCards(list)
    }

    const pushScore = async (sc:number) => {
        try {
            await useAxios.post('/scores', {score:sc, timeTaken, flipsCount:moves})
        } catch (error) {
            console.log(error)   
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    useEffect(() => {
        if(match !== 8){
            const interval = setInterval(() => {
                setTimeTaken((timeTaken) => timeTaken + 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            let sc = baseScore - (2 * timeTaken) - (2 * moves) - (3 * mismatch)
            setScore(sc)
            pushScore(sc);
            setFlippedCards([])
        }
    },[match])

    useEffect(() => {
        if(flippedCards.length === 2){
            const [first, second] = flippedCards;
            if(cards[first].name === cards[second].name){
                setTimeout(() => {
                    setFlippedCards([])
                }, 500);
                setMatch((match) => match + 1)
            } else {
                setMisMatch(mismatch => mismatch + 1)
                setTimeout(() => {
                    let newCards = [...cards]
                    flippedCards.map((item) => {
                        newCards[item].isFlipped = false;
                    })
                    setCards(newCards);
                    setFlippedCards([]);
                }, 500);
            }
        }
    },[flippedCards])

    const handleCardClick = (index:number) => {
        if(!cards[index].isFlipped){
            setMoves((moves) => moves + 1)
        }
        if(flippedCards.length < 2 && !cards[index].isFlipped){
            const newCards = [...cards]
            newCards[index].isFlipped = true;
            setCards(newCards);
            setFlippedCards([...flippedCards, index])
        }
    }

    const quitGame = () => {
        navigate('/')
        let newCards = [...cards]
        flippedCards.map((item) => {
            newCards[item].isFlipped = false;
        })
        setFlippedCards([])
        fetchImages()
    }

    // score=baseScore−(timeFactor×timeTaken)−(flipFactor×numberOfFlips)

  return (
    <section className="flex flex-col gap-2 h-svh w-full container mx-auto">
        <section className="flex justify-between items-center text-lg">
            <div className="flex gap-4 items-center">
                <p>Moves: <span>{moves}</span></p>
                <p>Match: <span>{match}</span>/{cards.length / 2}</p>
                <p>Mismatch: <span>{mismatch}</span> </p>
                <p>Time Count: <span>{timeTaken}</span> </p>
            </div>
            <p onClick={quitGame} className="cursor-pointer">Quit</p>
        </section>

        <section className="grid grid-cols-4 grid-rows-4 flex-1 gap-0.5 mb-2">
            {cards.map((i, index) => {
                return (<div key={index} onClick={() => handleCardClick(index)} className={`${i.isFlipped ? 'flipped' : 'bg-blueLagoon'} card flex justify-center relative overflow-hidden items-center text-lightBg`}>
                    <img className={`${i.isFlipped ? 'opacity-100' : 'opacity-0'} transition-all w-[100%] h-[100%] object-center object-cover absolute top-0 left-0`} src={i.imageUrl} alt={i.name} />
                    {/* <p className={`${i.isFlipped ? 'opacity-100 ' : 'opacity-0'} transition-all font-semibold text-lg`}>{i.name}</p> */}
                </div>)
            })}
        </section>

        { match === 8 && <Result score={score} flips={moves} timetaken={timeTaken} mismatch={mismatch}/>}
    </section> 
  )
}

export default Gameplay