export const loggingMiddleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  if (type === 'board/resetBoard') {
    console.log(`type: ${type}, payload: ${payload}`);
  }
  next(action);
};
