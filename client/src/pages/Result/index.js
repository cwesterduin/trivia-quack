import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Result = () => {
    const socket = useSelector(state => state.myReducer.socket)
    const qType = useSelector(state => state.myReducer.questions[0])
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const { id } = useParams()
    const [results, setResults] = useState([])
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)
    useEffect(() => {
        async function getResults() {
          try {
            setLoading(true)
            let { data } = await axios.get(`http://localhost:3000/games/${id}/results`);
            setResults(data.data)
            setScores(data.scores)
            setLoading(false)
            console.log('This is the data:',data)
            console.log('questions from reducer: ',qType)
          } catch (err) {
            setLoading(false)
            setError(err)
            console.warn(err);
          }
        }
        getResults();
      }, []);

      const scoreList = scores.map((score, i) => <li key={i}>{score.name}{socket.socket.id === score.name ? '(you)' : null} : {score.count}</li>)

      const answersList = results.map((result, i) => {
        return (
          <div key={i}>
            <div>{renderHTML(result.question)}</div>
            <ul>
              {result.all_answers.map((answer, j) => (
                <li
                  style={{
                    background:
                      answer === result.correct_answer ? "green" : "red",
                  }}
                >
                  {renderHTML(answer)}
                  <ul>{result.player_answers.filter(c => c.answer === answer).map(d => <li>{d.player}{socket.socket.id === d.player ? '(you)' : null}</li>)}</ul>
                </li>
              ))}
            </ul>
          </div>
        );
      });
      const pointsCalc = () => {
         // noOfQs * difficult (factor) * game type * correct answers
         // length(data.data) *  *  * data.scores.count
        const noOfQs = (data.data).length
        const diffFactor = 0
        const gameType = qType.type
        let typeFactor
        const correctAns = data.scores.count

        if (gameType === "boolean") {
          return typeFactor = 1
        } else if (gameType === "multiple") {
          return typeFactor = 2
        }

        let playerPoints = noOfQs * correctAns * typeFactor 
      }
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div style={{color: 'white'}}>
            <h1>Results</h1>
            <ul>{scoreList.sort((a,b) => b.score - a.score)}</ul>
            <div>{answersList}</div>
        </div>
      )}
    </>
  );
};

export default Result;