function Renderer({ data }) {
  const buildImageNode = (name, url, i, width, height) => {
    const style = {
      marginRight: `${data.config.iconPaddingHorizontal / 2}cm`,
      marginLeft: `${data.config.iconPaddingHorizontal / 2}cm`,
      marginTop: `${data.config.iconPaddingVertical / 2}cm`,
      marginBottom: `${data.config.iconPaddingVertical / 2}cm`
    }

    if (width && height) {
      style.width = `${width}cm`
      style.height = `${height}cm`
    } else if (width && !height) {
      style.width = `${width}cm`
      style.height = 'auto'
    } else if (!width && height) {
      style.width = 'auto'
      style.height = `${height}cm`
    } else {
      style.width = `${data.config.iconSize}cm`
      style.height = `${data.config.iconSize}cm`
    }

    return (
      <img
        key={`${name}-${i}`}
        src={url}
        style={style}
      />
    )
  }

  const buildImageNodes = () => {
    const images = []
    data.instructions.forEach(([count, name, url, width, height]) => {
      for (let i = 0; i < count; i++) {
        images.push(buildImageNode(name, url, i, width, height))
      }
    })
    return images
  }

  return (
    <>
      <div
        style={{
          outline: '1px solid black',
          width: `${data.config.pageWidth}in`,
          height: `${data.config.pageHeight}in`
        }}
      >
        {buildImageNodes()}
      </div>

      {/* Debugging Info */}
      {/*
      <pre style={{ marginTop: '20px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      */}
    </>
  )
}

export default Renderer
