export const fileNames = ['anvil', 'apple', 'arm', 'asparagus', 'axe']

const ndjsonFileName = () => {
    return fileNames[Math.floor(Math.random() * fileNames.length)]
}

export default ndjsonFileName