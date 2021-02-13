const consoleLog = (data:string) => {
  if (process.env.NODE_ENV === 'production') return;
  // eslint-disable-next-line no-console
  console.log(data);
};

export default consoleLog;
