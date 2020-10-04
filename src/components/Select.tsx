import React from 'react'

interface IPicker {
  value: string
  onChange: (value: string) => void
  options: Array<string>
}

export const Picker = ({ value, onChange, options }: IPicker) => (
  <div>
    <h1>{value}</h1>
    <label htmlFor="rselect">Choose a subreddit: </label>
    <select id="rselect" onChange={(e) => onChange(e.target.value)} value={value}>
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)
