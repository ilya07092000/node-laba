async function main() {
  console.log('START');
  setTimeout(() => console.log('Timeout'), 0)

  Promise.resolve().then(() => {
    console.log('PROMISE')
  })

  const response = await Promise.resolve('Async/Await');
  console.log(response);

  console.log('END')
}

main()