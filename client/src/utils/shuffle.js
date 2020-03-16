function shuffle(array) {
  const arrayNew = [...array];
  for (let i = arrayNew.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arrayNew[i]
    arrayNew[i] = arrayNew[j]
    arrayNew[j] = temp
  }
  return arrayNew;
}

export default shuffle;