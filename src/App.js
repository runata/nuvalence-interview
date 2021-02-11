import './App.css';
import { useState } from 'react'
import { SketchField, Tools} from 'react-sketch2'
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import Rectangle from './Rectangle'

const App = () => {
  const colors = ['black', 'orange', 'green', 'blue', 'yellow', 'cyan', 'red', 'purple']
  const [isDrawMode, setDrawMode] = useState(true)
  const [results, setResults] = useState([])

  const handleObjectAdded = (evt) => {
    const objects = evt.target.canvas._objects
    objects[objects.length - 1].stroke = colors[(objects.length - 1) % colors.length]
    generateResult(objects)

  }

  const handleObjectModified = (evt) => {
    const objects = evt.target.canvas._objects
    generateResult(objects)
  }

  const generateResult = (objects) => {
    let result = []
    // Check for intersection and adjacency
    for (let i = 0; i < objects.length; i++) {
      console.log(objects[i])
      
      const rect1 = new Rectangle(
        objects[i].aCoords.tl.x,
        objects[i].aCoords.tl.y,
        objects[i].aCoords.br.x,
        objects[i].aCoords.br.y
      )
      for (let j = i + 1; j < objects.length; j++) {
        const rect2 = new Rectangle(
          objects[j].aCoords.tl.x,
          objects[j].aCoords.tl.y,
          objects[j].aCoords.br.x,
          objects[j].aCoords.br.y
        )
        
        // Check for intersection
        const intersect = rect1.intersect(rect2)
        if (intersect) {
          result.push(`${objects[i].stroke} rectangle (${rect1.x1}, ${rect1.y1}, ${rect1.x2}, ${rect1.y2}) ` + 
          `intersects ${objects[j].stroke} rectangle (${rect2.x1}, ${rect2.y1}, ${rect2.x2}, ${rect2.y2}) ` + 
          `at points ${intersect.map(point => `(${point.x}, ${point.y}) `)}`)
        }

        // Check for adjacement
        const adjacent = rect1.adjacent(rect2)
        if (adjacent) { 
          result.push(`${objects[i].stroke} rectangle ${adjacent} adjacent to ${objects[j].stroke} rectangle`)
        }
      }
    }

    // Check for containment
    objects.forEach((object, i) => {
      const rect1 = new Rectangle(
        object.aCoords.tl.x,
        object.aCoords.tl.y,
        object.aCoords.br.x,
        object.aCoords.br.y
      )
      objects.forEach((otherObject, j) => {
        const rect2 = new Rectangle(
          otherObject.aCoords.tl.x,
          otherObject.aCoords.tl.y,
          otherObject.aCoords.br.x,
          otherObject.aCoords.br.y
        )
        if (i !== j && rect1.contains(rect2)) {
          result.push(`${object.stroke} rectangle contains ${otherObject.stroke} rectangle`)
        }
      })
    })

    setResults(result)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Draw rectangles using your mouse on the canvas below</h1>
      </header>
      <div>
        <p>You can toggle between DRAW and SELECT modes</p>
        <div className='toggle'>
          <span>Draw</span>
          <Toggle 
            checked={!isDrawMode}
            icons={false}
            onChange={() => setDrawMode(!isDrawMode)} 
          />
          <span>Select</span>
        </div>
        
      </div>
      <div className='main'>
        <SketchField 
          className='canvas'
          width='1024px'
          height='768px' 
          tool={isDrawMode ? Tools.Rectangle : Tools.Select} 
          lineColor='black'
          lineWidth={3}
          onObjectAdded={(evt) => handleObjectAdded(evt)}
          onObjectModified={(evt) => handleObjectModified(evt)}
        />
        <div className='results'>
          <h3>Results:</h3>
          {
            results.map((result, index) => <p key={index}>{result}</p>)
          }
        </div>
      </div>
     
    </div>
  );
}

export default App;
