import { render, screen } from '@testing-library/react';
import App from './App';
import fetchMock from 'fetch-mock'

fetchMock.get("http://localhost:8082/api/messages", [
  {
    subject: "Important!",
    read: false,
    starred: true,
    labels: ["dev", "personal"],
    body: "doesnt matter",
    id: 1
  }
]
)

describe('Smoke test for App', () => {


  it("do test", async () => {
    render(<App />);
  });
});
