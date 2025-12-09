import { useState } from 'react'

const DEFAULT_CONFIG = {
  pageWidth: 8.5,
  pageHeight: 11,
  iconSize: 0.6,
  iconPaddingHorizontal: 0.05,
  iconPaddingVertical: 0.05
}

const DEFAULT_INSTRUCTIONS = `
100, hamster, https://media.tenor.com/vLEZ2KX_AIEAAAAM/hampton-hamster.gif, 2
`.trim()

const EXAMPLE_INSTRUCTIONS = `
# This is a comment - lines starting with # are ignored
# Empty lines are ignored

# The format is: count, name, image_url, width (optional), height (optional)
# width and height are in centimeters

# Basic format - uses default size from config
5, dog, http://pictures.com/dog.jpg

# Custom width only - height will match width
10, cat, http://pictures.com/cat.png, 1.2

# Custom width and height
3, bird, http://pictures.com/bird.jpg, 2.0, 1.5
`.trim()

function Editor() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [formInstructionsString, setFormInstructionsString] = useState(DEFAULT_INSTRUCTIONS)

  const convertFormInstructionsToJsObject = (formInstructionsString) => {
    return formInstructionsString.split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#'))
      .map(line => line.split(",").map(part => part.trim()))
      .filter(x => x.length >= 3)
      .map(([count, name, url, width, height]) => [
        parseInt(count), // count
        name,
        url,
        parseFloat(width) || null, // width (optional)
        parseFloat(height) || null // height (optional, can be derived from width and aspect ratio)
      ])
  }

  const buildRendererUrl = (data) => {
    const paramsStr = new URLSearchParams(JSON.stringify(data)).toString()
    const search = `data=${paramsStr}`
    const newPath = location.href.split('?')[0] + `?${search}`
    return newPath
  }

  const handleSubmit = () => {
    const data = {
      config: config,
      instructions: convertFormInstructionsToJsObject(formInstructionsString)
    }
    window.open(buildRendererUrl(data), "_blank")
  }

  const NumberInput = ({ id, label, configKey, step }) => (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        value={config[configKey]}
        step={step}
        onChange={(e) => setConfig({...config, [configKey]: parseFloat(e.target.value)})}
      />
    </div>
  )

  return (
    <div id="editor">
      <div className="header" style={{ marginBottom: '10px' }}>
        <h2 style={{ display: 'inline-block' }}>Image Grid Generator</h2>
        <small style={{ display: 'inline-block', marginLeft: '10px' }}>
          By <a href="https://maxpleaner.com" target="_blank" rel="noopener noreferrer">Max Pleaner</a> 
          <br />
          <a href="https://github.com/MaxPleaner/StickerLayout" target="_blank" rel="noopener noreferrer">Source Code</a>
        </small>
      </div>

      <div className="config-section">
        <h2>Page Configuration</h2>
        <NumberInput id="page-width" label="Page Width (inches)" configKey="pageWidth" step="0.1" />
        <NumberInput id="page-height" label="Page Height (inches)" configKey="pageHeight" step="0.1" />
      </div>

      <div className="config-section">
        <h2>Icon Settings</h2>
        <NumberInput id="icon-size" label="Default Icon Size (cm)" configKey="iconSize" step="0.01" />
        <NumberInput id="icon-padding-horizontal" label="Horizontal Padding (cm)" configKey="iconPaddingHorizontal" step="0.01" />
        <NumberInput id="icon-padding-vertical" label="Vertical Padding (cm)" configKey="iconPaddingVertical" step="0.01" />
      </div>

      <div className="config-section">
        <h2>Guide</h2>
        <pre>{EXAMPLE_INSTRUCTIONS}</pre>
      </div>
      <div className="config-section">
        <h2>Your Instructions</h2>
        <textarea
          id="instructions"
          value={formInstructionsString}
          onChange={(e) => setFormInstructionsString(e.target.value)}
          placeholder="Enter your sticker layout instructions here..."
        />
      </div>

      <button id="submit" onClick={handleSubmit}>Generate Layout</button>
    </div>
  )
}

export default Editor
