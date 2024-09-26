import { useState, useCallback, useEffect, useRef } from "react"
import "./App.css"

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAll, setCharAll] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "1234567890"
    if (charAll) str += "!@#$%?{}[]*/^&*()"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllow, charAll])

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAll])

  return (
    <div className="container">
      <h1 className="heading">Password Generator</h1>
      <input
        type="text"
        value={password}
        ref={passwordRef}
        readOnly
        onClick={() => passwordRef.current.select()} // To select the password on click
      />
      <div className="length-control">
        <label htmlFor="length">Password Length: {length}</label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkbox-group">
        <label htmlFor="number">Include Numbers</label>
        <input
          type="checkbox"
          checked={numAllow}
          id="numberInput"
          onChange={() => setNumAllow((prev) => !prev)}
        />
      </div>
      <div className="checkbox-group">
        <label htmlFor="character">Include Special Characters</label>
        <input
          type="checkbox"
          checked={charAll}
          id="charInput"
          onChange={() => setCharAll((prev) => !prev)}
        />
      </div>
      <div className="button-group">
        <button className="button" onClick={passwordGenerator}>
          Generate Password
        </button>
        <button className="button" onClick={copyPasswordToClip}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  )
}

export default App
