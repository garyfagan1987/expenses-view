const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzNiMTUwNzhhZDUxOTdkYTZjNjkyNzgiLCJpYXQiOjE1NDczNzU4Nzl9.ABBMgXk00ud4oRbvCHWYwHLzJUITN1mTDIF_B997Rk4';

export default {
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': authToken,
  },
};
